import { getRequest, postRequest, patchRequest } from "@/api/axios";

export async function getUserList() {
  const result = await getRequest("chats");
  return result.data;
}

export async function getMessageList(postId, postType, receiverId) {
  const result = await getRequest(
    `chats/posts?postId=${postId}&postType=${postType}&receiverId=${receiverId}`
  );
  return result.data;
}

export async function sendMessage(content, postId, postType, receiverId) {
  console.log(content, postId, postType, receiverId);
  const result = await postRequest("chats", {
    body: {
      postId,
      postType,
      receiverId,
      content,
    },
  });
  return result;
}

export async function createContract(
  postId,
  postType,
  receiverId,
  contractDate
) {
  const result = await postRequest("contract", {
    body: JSON.stringify({
      postId,
      postType,
      receiverId,
      contractDate,
    }),
  });
  return result;
}

export async function patchContract(id, contractType) {
  const result = await patchRequest(`contract/${id}`, {
    body: JSON.stringify(contractType),
  });
  return result;
}
