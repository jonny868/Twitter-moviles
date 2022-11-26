import TweetCard from "../components/TweetCard";

export const checkAuthority = (tweet, userId) => {
    if (tweet.userId === userId) {
      return (
        <TweetCard
          isAuthor
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
          tweetId={tweet.id}
        />
      );
    } else {
      return (
        <TweetCard
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
        />
      );
    }
  };