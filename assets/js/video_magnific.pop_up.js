$(document).ready(function () {
    $(".video_magnific").magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
          
            patterns: {
              youtube: {
                index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
          
                id: function(src)
                  {
                  	// link pattern
					var mt = src.match(/v=([^&]+)(&(.*))?/);
                  	if (mt)
                  		return mt[1] +'?'+ mt[3];

                  	// embed pattern
                  	mt = src.match(/embed\/([^\?\/]+)(\?(.*))?/);
                  	if (mt)
                  		return mt[1] +'?'+ mt[3];
                  },
                  
                  src: '//www.youtube.com/embed/%id%&autoplay=1&rel=0'  // URL that will be set as a source for iframe.
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1'
              },
              gmaps: {
                index: '//maps.google.',
                src: '%id%&output=embed'
              }
          
              // you may add here more sources
          
            },
          
            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
          }
    });
})