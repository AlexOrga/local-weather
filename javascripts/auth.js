const {setUID,} = require('./firebaseAPI');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      // User is signed in
      $('#authscreen').addClass('hide');
      $('#application').removeClass('hide');
      $('#nav-links').removeClass('hide');
    } else {
      $('#authscreen').removeClass('hide');
      $('#application').addClass('hide');
      $('#nav-links').addClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
