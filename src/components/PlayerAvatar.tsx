import React from 'react';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-human-sprites';
import MuiAvatar from '@material-ui/core/Avatar';

type Props = {
  [key: string]: any;
  seed: string;
}
const _avatar = new Avatars(sprites, {
  base64: true,
});

export const PlayerAvatar = ( { seed, ...rest }: Props) => {
  return (<MuiAvatar src={_avatar.create(seed)} {...rest}></MuiAvatar>)
}