import { ProjectFileMap, ProjectGraph, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { lessToCssGenerator } from './generator';
import { LessToCssGeneratorSchema } from './schema';

jest.mock('@nx/devkit', () => ({
  ...jest.requireActual('@nx/devkit'),
  createProjectGraphAsync: jest.fn().mockImplementation(async () => {
    return projectGraph;
  }),
  createProjectFileMapUsingProjectGraph: jest
    .fn()
    .mockImplementation(async () => {
      return fileMap;
    }),
}));

let projectGraph: ProjectGraph;
let fileMap: ProjectFileMap;

describe('less-to-css generator', () => {
  let tree: Tree;
  const options: LessToCssGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    projectGraph = {
      nodes: {},
      dependencies: {},
      externalNodes: {},
    };
    fileMap = {};
  });

  it('should run successfully', async () => {
    projectGraph.nodes['test'] = {
      type: 'lib',
      name: 'test',
      data: {
        root: 'packages/test',
      },
    };
    fileMap['test'] = [
      {
        file: 'packages/test/src/file.less',
        hash: '<file-hash>',
      },
    ];

    const lessFile = `body {
  @my-color: red;
  div {
    color: @my-color;
    @other-color: blue;
    span {
      color: @other-color;
    }
  }
  span {
    color: @my-color;
  }
`;
    tree.write('packages/test/src/file.less', lessFile);

    await lessToCssGenerator(tree, options);

    const cssFile = tree.read('packages/test/src/file.css').toString();

    expect(cssFile).toMatchInlineSnapshot(`
      "body {
        --my-color: red;
        div {
          color: var(--my-color);
          --other-color: blue;
          span {
            color: var(--other-color);
          }
        }
        span {
          color: var(--my-color);
        }
      "
    `);
  });
});
