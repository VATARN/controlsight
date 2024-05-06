import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";

export interface CommentswithUser {
  id: number | null | undefined;
  text: string;
  issueId: number | null | undefined;
  userId: string | null | undefined;
  createdAt: string;
  user: {
    id: string | null | undefined;
    name: string;
    email: string | null | undefined;
    emailVerified: null | undefined;
    image: string;
  };
}

const ShowComments = ({ comments }: { comments: CommentswithUser[] }) => {
  const renderComment = (
    text: string,
    userName: string,
    image: string,
    createdAt: string
  ) => {
    return (
      <Box maxWidth="50rem" width="100%">
        <Card>
          <Flex gap="3" align="center">
            <Avatar size="2" src={image} radius="full" fallback="T" />
            <Box width="100%">
              <Flex justify="between" align="center" width="100%">
                <Text as="div" size="2" weight="bold" color="gray">
                  {userName}
                </Text>
                <Text as="p" size="1" color="gray">
                  {new Date(createdAt).toLocaleDateString()}{" "}
                  {new Date(createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Flex>
              <Text as="div" size="3">
                {text}
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    );
  };

  return (
    <Flex direction="column">
      {comments.map((comment) => (
        <div key={comment.id} className="mt-2">
          {renderComment(
            comment.text,
            comment.user?.name,
            comment.user.image,
            comment.createdAt
          )}
        </div>
      ))}
    </Flex>
  );
};

export default ShowComments;
