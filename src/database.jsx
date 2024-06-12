import supabase from "./supabase.jsx";
import bcrypt from "bcryptjs";

export async function Getuserdetails(id) {
  let { data: specific_user_data, error } = await supabase
    .from("user_data")                                        //to get the user details from the users table via id i.e uuid
    .select("*") //selecting all coloumns
    .eq("id", id); //gets the row where the id matches
  if (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
  return specific_user_data;
}
export async function CheckemailExists(email) {
  let { data: user_data, error1 } = await supabase
    .from("user_data")                                      //to check whether the entered mail exists in the users table
    .select("email") // Select only the 'email' column
    .eq("email", email);

  if (error1) {
    console.error("Error checking email:", error1);
    return false;
  }

  return user_data?.length > 0; // Return true if data exists
}
export async function PasswordCheck(email, pass) {
  let { data: specific_user_data, error } = await supabase      //we check the password using the mail which exists in the users table
    .from("user_data")
    .select("*") //selecting all coloumns
    .eq("email", email);
  console.log(specific_user_data[0].hashed_password);
  const Passwordmatch = await bcrypt.compare(
    pass,
    specific_user_data[0].hashed_password
  );
  if (Passwordmatch) {
    return true;
  } else {
    return false;
  }
}
export async function idm(id) {
  try {
    const { data, error } = await supabase
      .from("direct_messages")
      .insert([{ id: id }])
      .select();
    if (data) {
      console.log("idm");
      return true;
    } else {                                      //insert new row with a new users uuid into direct_messages where all dm contacts data be stored
      console.log("idm", error);
      return false;
    }
  } catch (error) {
    console.log(error);
    return "false1";
  }
}
export async function UserdetailsbyName(username) {
  let { data: specific_user_data, error } = await supabase    //users details from users table via username
    .from("user_data")
    .select("*") //selecting all coloumns
    .eq("username", username); //gets the row where the id matches
  if (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
  return specific_user_data;
}
export async function fetchUserDmChats(user) {
  let { data: dmstored, error } = await supabase      //to fetch the dm contacts of a user from the direct_messages table
    .from("direct_messages")
    .select("dm_chats")
    .eq("id", user.id);

  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    return(dmstored[0]?.dm_chats || []);
  }
}
export async function fetchUserDmChatsid(id) {
  let { data: dmstored, error } = await supabase      //to fetch the dm contacts of a user from the direct_messages table
    .from("direct_messages")
    .select("dm_chats")
    .eq("id", id);

  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    return(dmstored[0]?.dm_chats || []);
  }
}
export async function fetchUsermessages(id) {
  let { data: messagesstored, error } = await supabase    //to fetch the messages in the dm_chats table via the combined id
    .from("chats_dm")
    .select("messages")
    .eq("id", id);

  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    if(messagesstored[0].messages==null){
      return([])
    }
    else{
      return(messagesstored[0].messages);
    }
    
  }
}
export async function insertidforchannel(id) {
  try {
    const { data, error } = await supabase
      .from("channels_list")
      .insert([{ id: id }])
      .select();
    if (data) {
      console.log("done insert for id of channel");
      return true;
    } else {                                      //insert new row with a new users uuid into channels_list where all dm contacts data be stored
      console.log("insert id for channel", error);
      return false;
    }
  } catch (error) {
    console.log(error);
    return "false1";
  }
}