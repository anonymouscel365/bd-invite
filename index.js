$(document).ready(function() {
  const button = $('button');
  const envelope = $('.envelope');
  var flipped = false;

  function pullOut() {
        button.css('transform', 'translate(120px, 120px)');
      return new TimelineMax()
          .to('.flap', 1, {
              rotationX: 180,
              ease: Power1.easeInOut
          }, 'scaleBack')
          .to('.invitation', 1, {
              scale: 0.8,
              ease: Power4.easeInOut,
          }, 'scaleBack')
          .set('.flap', {
              zIndex: 0
          })
          .to('.card', 1, {
              y: '0%',
              scaleY: 1.2,
              ease: Circ.easeInOut,
          })
          .set('.mask', {
              overflow: 'visible',
              onComplete: function() {
                  envelope.toggleClass('is-open');
              }
          })
          .to('.mask', 1.3, {
              'clip-path': 'inset(0 0 0% 0)',
              ease: Circ.easeInOut,
          }, 'moveDown')
          .to('.card', 1.3, {
              y: '100%',
              scaleY: 1,
              ease: Circ.easeInOut,
          }, 'moveDown')
          .to('button', 1, {
              y: '0', // Adjust the y position back to its initial or desired state
              ease: Circ.easeInOut,
              onComplete: toggleText
          }, 'moveDown+=0.15');
  }

  function toggleFlip() {
      if (!envelope.hasClass('is-open')) {
          return;
      }

      const ry = (!flipped) ? 180 : 0;
      flipped = (!flipped) ? true : false;

      gsap.to('.card', {
          duration: 1,
          rotationY: ry,
          ease: 'power4.inOut',
          onComplete: toggleText
      });
  }

  function toggleText() {
      var text = !flipped ? 'Xem Mặt Sau!' : 'Tôi Sẽ Tham Gia!';
      button.toggleClass('invert', !flipped).text(text);
  }

  button.one('click', pullOut);
  button.on('click', toggleFlip);
});
