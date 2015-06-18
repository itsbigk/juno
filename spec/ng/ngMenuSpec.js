describe('menu service testing', function() {
  var Menu, httpBackend, menu;

  beforeEach(inject(function(_Menu_, $httpBackend) {
    Menu = _Menu_;
    httpBackend = $httpBackend
  }));

  it('should get a list of menus from the database', function() {
    httpBackend.expectGET('/api/menus').respond(200, [{
      menu1: {
        item1: {
          item: 'Pizza',
          price: 15,
          description: 'Best pizza ever'
        },
        item2: {
          item: 'Salad',
          price: 10,
          description: 'Healthy salad'
        }
      },
      menu2: {
        item1: {
          item: 'Sushi',
          price: 20,
          description: 'All you can eat'
        },
        item2: {
          item: 'Hamburger',
          price: 9,
          description: 'Best burger'
        }
      }
    }]);

    Menu.all()
      .success(function(data) {
        expect(data.menu1.item1.item).toEqual('Pizza');
        expect(data.menu1.item1.price).toEqual(15);
        expect(data.menu1.item1.description).toEqual('Best pizza ever');
        expect(data.menu1.item2.item).toEqual('Salad');
        expect(data.menu1.item2.price).toEqual(10);
        expect(data.menu1.item2.description).toEqual('Healthy salad');
        expect(data.menu2.item1.item).toEqual('Sushi');
        expect(data.menu2.item1.price).toEqual(20);
        expect(data.menu2.item1.description).toEqual('All you can eat');
        expect(data.menu2.item2.item).toEqual('Hamburger');
        expect(data.menu2.item2.price).toEqual(9);
        expect(data.menu2.item2.description).toEqual('Best Burger');
      });
    httpBackend.flush();
  });

  it('should create a new menu for a restaurant', function() {
    menu = {
      item: 'Pizza',
      price: 25,
      description: 'Fresh pizza'
    };

    httpBackend.expectPOST('/api/menus', menu).respond(200);
  });

  it('should get a specific menu and check the values', function() {
    httpBackend.expectGET('/api/menus/1').respond(200, {
      item: 'Salad',
      price: 15,
      description: 'Healthy salad'
    });
    Menu.get(1)
      .success(function(data) {
        expect(data.item).toEqual('Salad');
        expect(data.price).toEqual(15);
        expect(data.description).toEqual('Healthy salad');
      });
    httpBackend.flush();
  });
});
