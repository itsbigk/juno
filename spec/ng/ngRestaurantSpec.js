describe('juno restaurant service testing', function() {

  var Restaurant, httpBackend, rest;

  beforeEach(module('Juno'));

  beforeEach(inject(function(_Restaurant_, $httpBackend) {
    Restaurant = _Restaurant_;
    httpBackend = $httpBackend;
  }));

  // afterEach(function() {
  //    httpBackend.verifyNoOutstandingExpectation();
  //    httpBackend.verifyNoOutstandingRequest();
  //  });

  it('should get two restaurants when calling all', function() {

    httpBackend.expectGET('/api/restaurants').respond(200, [{
        name: 'Pizza Planet',
        cuisine: 'Italian',
        street: '123 Pizza Planet Drive',
        state: 'California',
        city: 'Los Angeles',
        zip: 90045,
        email: 'pizza.planet123456@gmail.com'
      },
      {
        name: 'Spagetti Central',
        cuisine: 'Italian',
        street: '124 Spagetti Drive',
        state: 'California',
        city: 'Los Angeles',
        zip: 90045,
        email: 'spagetti.restaurant@gmail.com'
      }]);

    Restaurant.all()
      .success(function(data) {
        expect(data.length).toBe(2);
        expect(data[0].name).toEqual('Pizza Planet');
        expect(data[0].cuisine).toEqual('Italian');
        expect(data[0].street).toEqual('123 Pizza Planet Drive');
        expect(data[0].state).toEqual('California');
        expect(data[0].city).toEqual('Los Angeles');
        expect(data[0].zip).toEqual(90045);
        expect(data[0].email).toEqual('pizza.planet123456@gmail.com');
        expect(data[1].name).toEqual('Spagetti Central');
        expect(data[1].cuisine).toEqual('Italian');
        expect(data[1].street).toEqual('124 Spagetti Drive');
        expect(data[1].state).toEqual('California');
        expect(data[1].city).toEqual('Los Angeles');
        expect(data[1].zip).toEqual(90045);
        expect(data[1].email).toEqual('spagetti.restaurant@gmail.com');
      });
      httpBackend.flush();
  });

  it('should create a new restaurant, check values, and delete when done', function() {
  rest = {
       name: 'Pizza',
       cuisine: 'Italian',
       street: '123 Pizza Planet Drive',
       state: 'California',
       city: 'Los Angeles',
       zip: 90045,
       email: 'pizza.planet123456@gmail.com'
     };

    httpBackend.expectPOST('/api/restaurants', rest).respond(200);
  });
});
