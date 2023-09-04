import axios from "axios";

export const signUp = async (data: unknown) => {
  try {
    const response = await axios.post("/signup", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
