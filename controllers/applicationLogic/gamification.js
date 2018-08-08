const experiencePerUpload = 10;
const experienceForEXIF = 2;


exports.rewardUserUploads = (user, values) => {
  let number = 0;
  let xpBonus = 0;

  values.forEach((status) => {
    if(status.saved) {
      number++;
      if (status.exif) {
        xpBonus += experienceForEXIF;
      } else {
        status.messages.forEach((message) => {
          if (message.hasOwnProperty("code") && message.code === "NOT_A_JPEG") number--;
          //TODO: should it not count?
        });
      }
    }
  });

  if (number > 0) {
    user.incrementUpload(number);
    user.addExperience((number * experiencePerUpload) + xpBonus);
  }
};
