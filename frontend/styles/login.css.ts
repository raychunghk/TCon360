import { style } from '@vanilla-extract/css';

import backgroundImg from '@/public/images/loginbg1.webp';
import { default as baseconfig } from '@/frontendconfig';
console.log(baseconfig);
const bgImage = `${baseconfig.prefix}/images/loginbg1.webp`;
export const wrapper = style({
  backgroundSize: 'cover',
  backgroundImage: `url('${bgImage}')`,
  //backgroundImage: `url('${backgroundImg.src}')`,
  height: '100vh',
});

export const form = style({
  maxWidth: 450,
  paddingTop: 80,
  height: '100vh',
  marginLeft: 'auto', // set marginLeft to auto to align the Paper component to the right

  marginRight: '150px',
});

export const title = style({
  // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
});

export const logo = style({
  // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  width: 120,
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});
export const steptitle = style({
  // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  color: 'black',
  fontFamily: `Greycliff CF `,
  fontSize: '1.2em',
  alignContent: 'center',
  marginTop: '20',
  marginBottom: '20',
});
