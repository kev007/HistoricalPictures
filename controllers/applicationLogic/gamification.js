const experiencePerUpload = 10;


exports.rewardUserUploads = (user, files) => {
  const number = files.length;

  user.incrementUpload(number);
  user.addExperience(number * experiencePerUpload);
};
