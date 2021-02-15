const Button = (props) => {
  const html = `<button>Click ${props.name}</button>`;
  const h = yum(html).first;
  yum(h).addClass(props.className);

  function fn(e) {
    console.log(`I clicked ${e.target.tagName} ${e.target.data} ${e.target.classList}`);
    const mom = yum(e.target).parent().first;
    // OR
    // yum(e.target.parentNode).find('#info').text('hey')
    console.log(mom.tagName);
    let count = Number(`${e.target.data}`);
    count += 1;
    e.target.data = count;
    yum(mom).find('#info').html(`clicked <strong>${e.target.classList}</strong> ${e.target.data} times `);
  }

  // Add some css, a click event and a class (class is  based on the props passed in).
  yum(h).css('cursor: pointer;').addClass(props.className).addEvent('click', fn);


  const toggleback = function(e) {
    yum(e).toggle('inline-block');
  };

  // Function to run when reacting to reactor on App (see below in h.ready)
  function runme(reactor) {
    console.log(`Button reacted to ${reactor.name}, do what you want with the data (${reactor.data})`);
    yum(reactor.subscriber).toggle().delay(1000, toggleback);
  }

  // A ready function is called automatically when the document is ready.
  // If you want to reference any other components or elements from within this
  // component you must do it here (or on another user initiated event) to ensure they have been loaded.
  h.ready = function() {
    const app = yum('.App').first;
    // We know app will exist in this case but safer to check in case of some other element
    if (app) {
      yum(h).ReactTo(app, 'AppReactor', runme, 'a');
    }
    console.log('ready');
  };

  // This is only needed if you want this component to react to itself
  h.react = function(e) {
    console.log(`Button's h.react ran with ${e.data}`);
  };

  // A simple example to show this component's reactor is working (check console after 3 secs.)
  setTimeout( (t)=> {
    h.atom.state = 3;
  }, 3000);


  return h;
};


