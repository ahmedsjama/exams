import { g as getData } from "../../../chunks/utils.js";
import { r as redirect } from "../../../chunks/index.js";
import { jwtVerify } from "jose";
async function load({ params, cookies }) {
  const { id } = params;
  const token = cookies.get("tisqaadToken");
  if (!token) {
    throw redirect(302, `/verify?id=${id}`);
  }
  const secret = new TextEncoder().encode("Tisqaad");
  if (!secret)
    throw redirect(302, `/verify?id=${id}`);
  let decoded;
  try {
    decoded = await jwtVerify(token, secret);
  } catch (error) {
    throw redirect(302, `/verify?id=${id}`);
  }
  if (!decoded || !decoded.payload.id)
    throw redirect(302, `/verify?id=${id}`);
  if (id !== decoded.payload.id)
    throw redirect(302, `/verify?id=${id}`);
  return await getData(id);
}
export {
  load
};
