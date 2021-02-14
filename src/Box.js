import '../src/Button.js';

const Box = () => {
  const html = `<div><p><u>Box Component in App</u></p></div>`;
  const h = yum(html).first;
  yum(h).css('margin-top: 10px; border: 1px solid black; width: 300px; padding: 10px;');
  console.log('box');

  yum()._render(Button, h, {addClass: false, props: {className: 'button1', name: 'button1'}, initState: '0'} );
  yum()._render(Button, h, {addClass: false, props: {className: 'button2', name: 'button2'}, initState: '0'} );
  const infobox = yum()._createNode('div');
  yum(infobox).text('info').attr('id', 'info').css('margin-top: 10px;');
  yum(infobox).appendTo(h);
  return h;
};
