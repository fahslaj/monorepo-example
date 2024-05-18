import {
  createProjectFileMapUsingProjectGraph,
  createProjectGraphAsync,
  formatFiles,
  Tree,
} from '@nx/devkit';
import { LessToCssGeneratorSchema } from './schema';

/**
 * A simple example of replacing Less variables with CSS variables within the same file they are declared.
 * @param tree
 * @param options
 */
export async function lessToCssGenerator(
  tree: Tree,
  options: LessToCssGeneratorSchema
) {
  const projectGraph = await createProjectGraphAsync();
  const project = projectGraph.nodes[options.name];
  if (!project) {
    throw new Error(`Project ${options.name} not found in the project graph`);
  }

  const fileMap = await createProjectFileMapUsingProjectGraph(projectGraph);
  const files = fileMap[options.name];

  if (!files) {
    throw new Error(`Error obtaining files from project ${options.name}`);
  }

  const lessFiles = files.filter((file) => file.file.endsWith('.less'));
  for (const file of lessFiles) {
    let fileContent = tree.read(file.file).toString();

    const matches = fileContent.match(/@(.*):/g);
    for (const match of matches) {
      const variable = match.substring(1, match.length - 1);
      fileContent = fileContent.replace(match, `--${variable}:`);
      fileContent = fileContent.replace(
        new RegExp(`@${variable}`, 'g'),
        `var(--${variable})`
      );
    }

    const cssFile = file.file.replace(/\.less$/, '.css');
    tree.delete(file.file);
    tree.write(cssFile, fileContent);
  }

  await formatFiles(tree);
}

export default lessToCssGenerator;
