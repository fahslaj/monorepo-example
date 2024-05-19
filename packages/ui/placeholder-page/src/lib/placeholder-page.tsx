interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const placeholderText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor nunc nec felis scelerisque eget elementum erat dignissim. Ut vel ipsum mollis orci venenatis luctus. Aenean vehicula quam vel quam porttitor ac iaculis elit pulvinar. Proin euismod, ipsum non faucibus rutrum, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.';

  const placeholderImage = 'https://via.placeholder.com/350';

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <p className="mb-4">{placeholderText}</p>
          <img className="mb-4" src={placeholderImage} alt="placeholder" />
        </div>
      ))}
    </div>
  );
}
