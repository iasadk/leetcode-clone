import toast from "react-hot-toast";

const makeToast = (msg: String, type: String, width = "250px") => {
  if (type === "success") {
    return toast.success(msg, {
      style: {
        width,
      },
    });
  } else if (type === "error") {
    return toast.error(msg,{
        style: {
          width,
          border:"1px solid red"
        },
      });
  }
};
const makeToastIcon = (msg: String, icon:any,duration:Number = 1200) => {
  toast(msg, {
    icon: icon,
    duration
  });
};


export { makeToast,makeToastIcon };
