/*
 * SexyLightBox 2 by Eduardo D. Sada (http://www.coders.me)
 * versión 2.0.1
 * To be used with mootools 1.2
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

var SexyLightBox = new Class({
	getOptions: {
			name: 'TB',
			zIndex: 65555,
			onReturn: false,
			onReturnFunction : $empty,
			BoxStyles: {
				'width': 486,
				'height': 320
			},
			OverlayStyles: {
				'background-color': '#fff',
				'opacity': 0.6
			},
			
			Skin       : {
        'white' : {
          hexcolor    :'#FFFFFF',
          captionColor:'#000000'
        },
        'black' : {
          hexcolor    :'#000000',
          captionColor:'#FFFFFF'
          
        }
      },
			color       :'black',
			find        :'sexylightbox',
			imagesdir   :'sexyimages',
			background  :'bgSexy.png',
			backgroundIE:'bgSexy.gif',
			closeButton : 'SexyClose.png',
			showDuration: 200,
			showEffect  : Fx.Transitions.linear,
      closeDuration: 200,
			closeEffect : Fx.Transitions.linear,
			moveDuration: 800,
			moveEffect  : Fx.Transitions.Back.easeInOut,
			resizeDuration:800,
			resizeEffect: Fx.Transitions.Back.easeInOut
	},
  
	initialize: function(options){
      this.setOptions(this.getOptions, options);

      if(Browser.Engine.trident4)
        this.strBG = this.options.imagesdir+'/'+this.options.color+'/'+this.options.backgroundIE;
      else
        this.strBG = this.options.imagesdir+'/'+this.options.color+'/'+this.options.background;

      this.options.display == 0;

      /**
       * Creamos los elementos
       ************************/
      this.Overlay = new Element('div', {
        'styles': {
          'display': 'none',
          'z-index': this.options.zIndex,
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'background-color': this.options.OverlayStyles['background-color'],
          'opacity': 0,
          'height': window.getScrollHeight() + 'px',
          'width': window.getScrollWidth() + 'px'
        }
      });
      
      this.Wraper = new Element('div', {
        'class': 'SexyLightBox_cb',
        'styles': {
          'z-index': this.options.zIndex,
          'display': 'none',
          'position': 'absolute',
          'top': -this.options.BoxStyles['height']+'px',
          'left': (window.getScroll().x + (window.getSize().x - this.options.BoxStyles['width']) / 2).toInt()+'px'
        }
      });
      
      this.Clapclap = new Element('div', {
        'styles': {
          'position': 'absolute',
          'left': '7px',
          'top': '7px',
          'float': 'left',
          'overflow':'hidden',
          'z-index': this.options.zIndex + 1
        }
      }).injectInside(this.Wraper);
      
      this.Contenedor = new Element('div', {
        'styles': {
          'position': 'absolute',
          'width': this.options.BoxStyles['width'] + 'px',
          'z-index': this.options.zIndex + 2
        }
      }).injectInside(this.Wraper);
      
      
      this.bt = new Element('div', {'class': 'bt','styles':{'background-image':'url('+this.strBG+')'}}).injectInside(this.Contenedor);
      
      this.CloseButton = new Element('a', {'href':'#'}).injectInside(this.bt);
      new Element('img', {'src': this.options.imagesdir+'/'+this.options.color+'/'+this.options.closeButton}).injectInside(this.CloseButton);

      new Element('div',{'styles':{'background-image':'url('+this.strBG+')'}}).injectInside(this.bt);
      
      this.Contenido   = new Element('div', {
        'class':'i1',
        'styles':{
          'height': this.options.BoxStyles['height'] + 'px',
          'border-left-color': this.options.Skin[this.options.color].hexcolor,
          'border-right-color': this.options.Skin[this.options.color].hexcolor
        }
      }).injectInside(this.Contenedor);

      this.bb          = new Element('div', {'class':'bb','styles':{'background-image':'url('+this.strBG+')'}}).injectInside(this.Contenedor);
      this.innerbb     = new Element('div', {'class':'innerbb','styles':{'background-image':'url('+this.strBG+')'}}).injectInside(this.bb);
      this.Nav         = new Element('div', {'class':'nav','styles':{'color':this.options.Skin[this.options.color].captionColor}});
      this.Descripcion = new Element('strong',{'styles':{'color':this.options.Skin[this.options.color].captionColor}});

      this.Overlay.injectInside(document.body);
      this.Wraper.injectInside(document.body);
    
      /**
       * AGREGAMOS LOS EVENTOS
       ************************/

      this.CloseButton.addEvent('click', function(event) {
        event.stop();
        this.display(0);
      }.bind(this));

      window.addEvent('resize', function() {
        if(this.options.display == 1) {
          this.replaceBox();
        } else {
          this.Overlay.set('styles', {
              'height': '0px',
              'width': '0px'
          });
        }
      }.bind(this));

      window.addEvent('scroll', function() {
        if(this.options.display == 1) {
          this.replaceBox();
        }
      }.bind(this));
      
      this.Overlay.addEvent('click', function() {
        this.display(0);
      }.bind(this));

      this.anchors = [];

      var imageURL = /\.(jpe?g|png|gif|bmp)/gi;
      
      $$("a", "area").each(function(el) {
        if (el.getProperty('rel') && el.getProperty('rel').test("^"+this.options.find)){
          el.addEvent('click', function(event) {
            event.stop();
            this.hook(el);
          }.bind(this));
          this.anchors.push(el);
        }
      }.bind(this));
	
      this.MoveBox = $empty();
	
  },

	/*
	Function: hook
		Recuperar los parametros del enlace, y enviarselos a la funcion show
		
	Argument:
		enlace - object, la referencia a un elemento link.
	*/	
  hook: function(enlace) {
      enlace.blur();
      this.show((enlace.title || enlace.name || ""), enlace.href, (enlace.getProperty('rel') || false));
  },




	/*
	Property: display
		Show or close box
		
	Argument:
		option - integer, 1 to Show box and 0 to close box (with a transition).
	*/	
  display: function(option) {
      // Detener la transicion por las dudas
      if(this.Transition)
        this.Transition.cancel();				

      // Mostrar lo sexy que es LightBox
      if(this.options.display == 0 && option != 0 || option == 1) {

        if(Browser.Engine.trident4)
          $$('select', 'object', 'embed').each(function(node){ node.style.visibility = 'hidden' });

        this.Overlay.setStyle('display', 'block');
        this.options.display = 1;
        this.fireEvent('onShowStart', [this.Overlay]);

        this.Transition = new Fx.Tween(this.Overlay,
          {
            property: 'opacity',
            duration: this.options.showDuration,
            transition: this.options.showEffect,
            onComplete: function() {

              sizes = window.getSize();
              scrollito = window.getScroll();
              this.Wraper.setStyles({
                'display': 'block',
                'left': (scrollito.x + (sizes.x - this.options.BoxStyles['width']) / 2).toInt()
              });

              this.fireEvent('onShowComplete', [this.Overlay]);

            }.bind(this)
          }
        ).start(this.options.OverlayStyles['opacity']);

      }
      // Cerrar el Lightbox
      else
      {
        if(Browser.Engine.trident4)
          $$('select', 'object', 'embed').each(function(node){ node.style.visibility = 'visible' });

        this.Wraper.setStyles({
          'display': 'none',
          'top': 0
        });
        this.options.display = 0;

        this.fireEvent('onCloseStart', [this.Overlay]);

        this.Transition = new Fx.Tween(this.Overlay,
          {
            property: 'opacity',
            duration: this.options.closeDuration,
            transition: this.options.closeEffect,
            onComplete: function() {
                this.fireEvent('onCloseComplete', [this.Overlay]);
            }.bind(this)
          }
        ).start(0);

      }			
    
  },
  
  
	/*
	Property: replaceBox
    Cambiar de tamaño y posicionar el lightbox en el centro de la pantalla
	*/
	replaceBox: function(data) {
      sizes = window.getSize();
      scrollito = window.getScroll();
      
      data = $extend({
        'width'  : this.ajustarWidth,
        'height' : this.ajustarHeight,
        'resize' : 0
      }, data || {});

      if(this.MoveBox)
        this.MoveBox.cancel();

      this.MoveBox = new Fx.Morph(this.Wraper, {
        duration: this.options.moveDuration,
        transition: this.options.moveEffect
      }).start({
        'left': (scrollito.x + (sizes.x - data.width) / 2).toInt(),
        'top': (scrollito.y + (sizes.y - data.height) / 2).toInt()-40
      });


      if (data.resize) {
        if(this.ResizeBox2)
          this.ResizeBox2.cancel();
        this.ResizeBox2 = new Fx.Morph(this.Contenido, {
          duration: this.options.resizeDuration,
          transition: this.options.resizeEffect
        }).start({
          'height': data.height+ 'px'
        });

        if(this.ResizeBox)
          this.ResizeBox.cancel();

        this.ResizeBox = new Fx.Morph(this.Contenedor, {
          duration: this.options.resizeDuration,
          transition: this.options.resizeEffect
        }).start({
          'width': data.width + 'px'
        });
      }

      this.Overlay.set('styles', {
          'height': window.getScrollHeight() + 'px',
          'width': window.getScrollWidth() + 'px'
      });
      
	},
	
	/*
	Function: getInfo
		Devolver los botones de navegacion
	*/	
  getInfo: function (image, id) {
      return new Element('a', {
        'id'    : this.options.name+id,
        'title' : image.title,
        'href'  : image.href,
        'rel'   : image.getProperty('rel')
        }).adopt(new Element('img', {
          'src'   : this.options.imagesdir+'/'+this.options.color+'/SexyBt'+id+'.png',
          'class' : 'bt'+id
        }));
  },

	/*
	Function: show
		Verificar que el enlace apunte hacia una imagen, y preparar el lightbox.
	*/
  show: function(caption, url, rel) {
      this.MostrarNav = false;
      this.showLoading();


      // check if a query string is involved
      var baseURL = url.match(/(.+)?/)[1] || url;

      // regex to check if a href refers to an image
      var imageURL = /\.(jpe?g|png|gif|bmp)/gi;

      // check for images
      if ( baseURL.match(imageURL) ) {

      
          // Si la imagen pertenece a un grupo
          if (rel.length > this.options.find.length)
          {
              this.MostrarNav = true; //Mostrar barra de navegacion

              var foundSelf = false;
              var exit = false;
          
              this.anchors.each(function(image){
              

                if (image.getProperty('rel') == rel && !exit) {
                  if (image.href == url) {
                      foundSelf = true;
                  } else {
                      if (foundSelf) {
                          this.next = this.getInfo(image, "Right");
                          // stop searching
                          exit = true;
                      }
                      else {
                          this.prev = this.getInfo(image, "Left");
                      }
                  }
                }
              }.bind(this));

          }
          
          /**
           * Cargar Imagen.
           *****************/
          this.imgPreloader = new Image();
          this.imgPreloader.onload = function() {
              this.imgPreloader.onload=function(){};

              // Resizing large images
              var x = window.getWidth() - 150;
              var y = window.getHeight() - 150;
              var imageWidth = this.imgPreloader.width;
              var imageHeight = this.imgPreloader.height;

              if (imageWidth > x)
              {
                imageHeight = imageHeight * (x / imageWidth);
                imageWidth = x;
                if (imageHeight > y)
                {
                  imageWidth = imageWidth * (y / imageHeight);
                  imageHeight = y;
                }
              }
              else if (imageHeight > y)
              {
                imageWidth = imageWidth * (y / imageHeight);
                imageHeight = y;
                if (imageWidth > x)
                {
                  imageHeight = imageHeight * (x / imageWidth);
                  imageWidth = x;
                }
              }
              // End Resizing


              
              // Ajustar el tamaño del lightbox
              if (this.MostrarNav || caption){
                this.ajustarHeight = (imageHeight-21);
              }else{
                this.ajustarHeight = (imageHeight-34);
              };

              this.ajustarWidth = (imageWidth+14);
              
              this.replaceBox({
                'width'  :this.ajustarWidth,
                'height' :this.ajustarHeight,
                'resize' : 1
              });
              
              // Mostrar la imagen, solo cuando la animacion de resizado se ha completado
              this.ResizeBox.addEvent('onComplete', function() {
                this.showImage(this.imgPreloader.src, {'width':imageWidth, 'height': imageHeight});
              }.bind(this));
              this.addButtons();
          }.bind(this);
          
          this.imgPreloader.onerror = function() {

            if (this.MostrarNav || caption){
              this.ajustarHeight = (this.options.BoxStyles['height']-21);
            }else{
              this.ajustarHeight = (this.options.BoxStyles['height']-34);
            };

            this.ajustarWidth = (this.options.BoxStyles['width']+14);

            this.replaceBox({
              'width'  :this.ajustarWidth,
              'height' :this.ajustarHeight,
              'resize' : 1
            });

              // Mostrar la imagen, solo cuando la animacion de resizado se ha completado
            this.ResizeBox.addEvent('onComplete', function() {
              this.showImage(this.options.imagesdir+'/'+this.options.color+'/404.png', this.options.BoxStyles);
            }.bind(this));

            this.addButtons();
          }.bind(this);

          this.imgPreloader.src = url;

      } else { //code to show html pages
        
        var queryString = url.match(/\?(.+)/)[1];
        var params = this.parseQuery( queryString );
        
        // Ajustar el tamaño del lightbox
        if (this.MostrarNav || caption){
          this.ajustarHeight = (params['height'].toInt()-21);
        }else{
          this.ajustarHeight = (params['height'].toInt()-34);
        };

        this.ajustarWidth = (params['width'].toInt()+14);

        this.replaceBox({
          'width'  :this.ajustarWidth,
          'height' :this.ajustarHeight,
          'resize' : 1
        });
        
        if (url.indexOf('TB_inline') != -1) {
          // Mostrar la imagen, solo cuando la animacion de resizado se ha completado
          this.ResizeBox.addEvent('onComplete', function() {
            this.showContent($(params['inlineId']).get('html'), {'width':this.ajustarWidth, 'height': this.ajustarHeight+34});
          }.bind(this));

        } else if(url.indexOf('TB_iframe') != -1) {
          var urlNoQuery = url.split('TB_');
          // Mostrar la imagen, solo cuando la animacion de resizado se ha completado
          this.ResizeBox.addEvent('onComplete', function() {
            this.showIframe(urlNoQuery[0], {'width':this.ajustarWidth, 'height': this.ajustarHeight+34});
          }.bind(this));

        } else {
          this.ResizeBox.addEvent('onComplete', function() {
            var myRequest = new Request.HTML({
              url: url,
              method: 'get',
              onSuccess: this.handlerFunc.bind(this)
            }).send();

          }.bind(this));

        }
       
        
      }


      this.showNav(caption);

      this.display(1);
  },
  
  handlerFunc: function(tree, elements, html) {
    this.showContent(html, {'width':this.ajustarWidth, 'height': this.ajustarHeight+34});
  },

  addButtons: function(){
      if(this.prev) this.prev.addEvent('click', function(event) {event.stop();this.hook(this.prev);}.bind(this));
      if(this.next) this.next.addEvent('click', function(event) {event.stop();this.hook(this.next);}.bind(this));
  },
  
 /**
  * Mostrar navegacion.
  *****************/
  showNav: function(caption) {
      if (this.MostrarNav || caption) {
        this.bb.addClass("bbnav");
        this.Nav.empty();
        this.Nav.injectInside(this.innerbb);
        this.Descripcion.set('html', caption);
        this.Nav.adopt(this.prev);
        this.Nav.adopt(this.next);
        this.Descripcion.injectInside(this.Nav);
      }
      else
      {
        this.bb.removeClass("bbnav");
        this.innerbb.empty();
      }
  },
  
  showImage: function(image, size) {
    this.Image = new Element('img', { 'src' : image, 'styles': {
        width: size['width'],
        height: size['height']
    }}).injectInside(this.Clapclap.empty().erase('styles').set('styles', {width:'auto', height:'auto', overflow: 'visible'}));

    this.Contenedor.setStyles({
      'background' : 'none'
    });

    this.Contenido.empty().set('styles', {
        'background-color': 'transparent',
        padding: '0px',
        overflow: 'visible',
        width: 'auto'
    });
  },
  
  showContent: function(html, size) {
    this.Clapclap.set('styles', {
        width: size['width']-14,
        height: size['height'],
        'background-color': '#ffffff'
    });
  
    this.Image = new Element('div', { 'styles': {
        width: size['width']-14-40,
        height: size['height']-34,
        background: '#ffffff'
    }}).set('html',html).injectInside(this.Contenido.empty().set('styles', {
        'background-color': '#ffffff',
        padding: '0 20px',
        overflow: 'auto',
        width: size['width']-14-40
    }));
    this.Contenedor.setStyles({
      'background' : 'none'
    });
  },

  showIframe: function(src, size) {
    this.Clapclap.set('styles', {
        width: size['width']-14,
        height: size['height'],
        'background-color': '#ffffff'
    });
  
    this.Image = new Element('iframe', {
      frameborder: 0,
      'styles': {
        width: size['width']-14,
        height: size['height']-34,
        background: '#ffffff'
    }}).set('src',src).injectInside(this.Contenido.empty().set('styles', {
        'background-color': '#ffffff',
        padding: '0px',
        overflow: 'visible',
        width: size['width']-14
    }));
    this.Contenedor.setStyles({
      'background' : 'none'
    });
  },

  showLoading: function() {
      this.Clapclap.empty().erase('styles').set('styles', {width:'auto', height:'auto'});

      this.Contenido.empty().set('styles', {
          'background-color': 'transparent',
          padding: '0px',
          overflow: 'visible',
          width: 'auto'
      });

      this.Contenedor.setStyles({
        'background' : 'url('+this.options.imagesdir+'/'+this.options.color+'/loading.gif) no-repeat 50% 50%'
      });

      this.replaceBox({
        'width'  : this.options.BoxStyles['width'],
        'height' : this.options.BoxStyles['height'],
        'resize' : 1
      });
  },

  parseQuery: function (query) {
    if( !query )
      return {};
    var params = {};

    var pairs = query.split(/[;&]/);
    for ( var i = 0; i < pairs.length; i++ ) {
      var pair = pairs[i].split('=');
      if ( !pair || pair.length != 2 )
        continue;
      params[unescape(pair[0])] = unescape(pair[1]).replace(/\+/g, ' ');
     }
     return params;
  }

  
});

SexyLightBox.implement(new Events, new Options);