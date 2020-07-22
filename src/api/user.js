import request from "@/utils/request";

export async function login(params) {
    console.log('11111111111111111111111')
    return request({
        url: "/api/user/login",
        method: "post",
        data: params,
    });
}

export function geUserInfo(params) {
    console.log(params);
  return request({
    // url: `/api/user/info?userId=${params.userId}`,
    url: '/api/user/info',
    method: "get",
  });
}