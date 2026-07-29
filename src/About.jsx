const About = () => {
  return (
    <div className="flex flex-col items-center mt-16 text-center *:w-150">
      <h1 className="text-lg font-semibold">About</h1>
      <p>
        This app used to allow the user to view multiple subreddits from the
        official Reddit page through an API. Unfortunately, Reddit made major
        changes in the way their API works and the way users gain access to it
        which resulted in me permanently losing access and resorting to using
        mock-up data for the purpose of showcasing the interface.
      </p>
      <p className="mt-3">Thank you for visiting!</p>
    </div>
  );
};

export default About;
