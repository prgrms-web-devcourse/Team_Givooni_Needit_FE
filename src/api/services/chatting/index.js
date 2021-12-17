import { getRequest, postRequest, patchRequest } from "@/api/axios";

function getToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXJAZW1haWwuY29tIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjM5NzQ0NTk5fQ.PMiZE30xjMNwgwyFrgqDxMuGMKWuv5qNkmoJpVX-q4M";
}

export async function getUserList() {
  const token = getToken();
  const result = await getRequest("chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("메세지유저목록", result);
  return result.data;
}

export async function getMessageList(postId, postType, receiverId) {
  const token = getToken();
  const result = await getRequest(
    `/chats/posts?postId=${postId}&postType=${postType}&receiverId=${receiverId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("메세지목록", result);
  return result.data;
}

export async function sendMessage(content, postId, postType, receiverId) {
  const token = getToken();
  const result = await postRequest("chats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postId,
      postType,
      receiverId,
      content,
    }),
  });
  console.log("메세지보내기", result);
  return result;
}

export async function createContract(
  postId,
  postType,
  receiverId,
  contractDate
) {
  const token = getToken();
  const result = await postRequest("contract", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postId,
      postType,
      receiverId,
      contractDate,
    }),
  });
  console.log("기부예약 생성", result);
  return result;
}

export async function patchContract(id, contractType) {
  const token = getToken();
  const result = await patchRequest(`contract/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contractType),
  });
  console.log("기부 예약 수락,거절", result);
  return result;
}
