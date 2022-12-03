const namesToAvatar = (name1: string, name2: string) => {
  let first = name1 && name1.charAt(0);
  let second = name2 && name2.charAt(0);
  let avatarText = `${first ? first : ""}${second ? second : ""}`;

  return avatarText;
};

export default namesToAvatar;
