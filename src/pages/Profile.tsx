import React from "react";

const user = {
  name: "Hedy Lamarr",
  imageUrl:
    "https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/6d/wallhaven-6d5r5x.jpg?w=2560&h=1440&fmt=webp",
  imageSize: 200,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
