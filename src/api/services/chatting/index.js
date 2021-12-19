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
  const result = await postRequest("chats", {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      postId,
      postType,
      receiverId,
      content,
    }),
  });
  return result;
}

export async function createContract(
  contractDate,
  postId,
  postType,
  receiverId
) {
  const dataFormat = new Date(contractDate).toJSON();
  const result = await postRequest("contract", {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      postId,
      postType,
      receiverId,
      contractDate: dataFormat,
    }),
  });
  return result;
}

export async function patchContract(id, contractStatus) {
  const result = await patchRequest(`contract/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ contractStatus }),
  });
  return result;
}
