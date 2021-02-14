import '../src/Box.js';

const App = (props) => {
  console.log('App');
  const html = `<div>Main App Component</div>`;

  const h = yum(html).first;

  h.reset = function() {
    console.log('resetting component');
    yum(h).html('I am App');
  };

  // If component has one of these h.react function and an initState set, it will auto run this function and can react to itself with h.atom.h
  h.react = function(reactor) {
    console.log(`${reactor.name} reacted with ${reactor.data} `);
    console.log(`${reactor.data} `);
    yum(reactor.subscriber).append(`<p><span class='info' style='cursor: pointer;'>${reactor.data}</span></p>`);
  };

  // use props to set a class
  yum(h).addClass( props.foo);
  // React to own state
  // yum(h).on('click', function() { h.atom.state = 1; console.log('clicked '+h.data) } );

  // both of these work work
  // yum()._render(Box, '.App', { addClass: true, props: { foo: 'fum', }, initState: 'some dat' } );
  yum()._render(Box, h, {addClass: true, props: {name: 'box'}, initState: 'box '} );


  // Since button1 is loaded by Box it isn't known until the document has loaded. Element with class 'info' isn't either so wait to access it in the ready
  h.ready = function() {
    const button = yum('.button1').first;
    console.log('button tag is '+button.tagName);

  // An click event on this component to fiddle with the atom
  // Button is subscribed to atom.a - Button will react to this action and run a function that toggles its visibility twice.
  // let info = yum('.info').first;
    // yum(info).on('click', function() {
    // OR 
    let info = yum(h).find('.info').on('click', function() {
    h.atom.a = 1; console.log('clicked '+h.data);
  });


  };


  return h;
};


// Render App to an existing DOM element with id root. You can use yum()._createNode to make a root then render to that too
yum(document).ready( function() {
  yum()._render(App, '#root', {addClass: true, props: {foo: 'fum'}, initState: `App's  InitState, click me`} );
});
