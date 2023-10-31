"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailedProducts = DetailedProducts;
exports.featuredProducts = featuredProducts;
exports.newProductsfromDB = newProductsfromDB;
exports.AllFeaturedProductsfromDB = AllFeaturedProductsfromDB;
exports.AllProductsfromDB = AllProductsfromDB;
exports.getCategory = getCategory;
exports.ProductsFromDB = ProductsFromDB;
exports.PostOrder = PostOrder;
exports.UpdateOrder = UpdateOrder;
exports.docClient = void 0;

var _libDynamodb = require("@aws-sdk/lib-dynamodb");

var _clientDynamodb = require("@aws-sdk/client-dynamodb");

var _uuid = require("uuid");

var client = new _clientDynamodb.DynamoDBClient({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY
  }
});

var docClient = _libDynamodb.DynamoDBDocumentClient.from(client);

exports.docClient = docClient;

function DetailedProducts(featuredid) {
  var command, response;
  return regeneratorRuntime.async(function DetailedProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          command = new _libDynamodb.GetCommand({
            TableName: 'Product',
            Key: {
              id: featuredid
            }
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.Item);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function featuredProducts(featuredid) {
  var command, response;
  return regeneratorRuntime.async(function featuredProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          command = new _libDynamodb.GetCommand({
            TableName: 'Product',
            Key: {
              id: featuredid
            }
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.Item);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function newProductsfromDB() {
  var command, response;
  return regeneratorRuntime.async(function newProductsfromDB$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          command = new _libDynamodb.ScanCommand({
            TableName: "Product",
            Limit: 10,
            ScanIndexForward: false
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.Items);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function AllFeaturedProductsfromDB() {
  var command, response;
  return regeneratorRuntime.async(function AllFeaturedProductsfromDB$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          command = new _libDynamodb.ScanCommand({
            TableName: "Product",
            Limit: 10,
            ScanIndexForward: false
          });
          _context4.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.Items);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function AllProductsfromDB() {
  var command, response;
  return regeneratorRuntime.async(function AllProductsfromDB$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          command = new _libDynamodb.ScanCommand({
            TableName: "Product"
          });
          _context5.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.Items);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getCategory(Catid) {
  var command, response;
  return regeneratorRuntime.async(function getCategory$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          command = new _libDynamodb.GetCommand({
            TableName: 'Category',
            key: {
              id: Catid
            }
          });
          _context6.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context6.sent;
          console.log(response.Item);
          return _context6.abrupt("return", response.Item);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function ProductsFromDB() {
  var command, response;
  return regeneratorRuntime.async(function ProductsFromDB$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          command = new _libDynamodb.ScanCommand({
            TableName: "Product",
            ScanIndexForward: false
          });
          _context7.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
          response = _context7.sent;
          return _context7.abrupt("return", response.Items);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function PostOrder(data) {
  var line_items, name, email, city, postalCode, streetAddress, country, newId, command, response;
  return regeneratorRuntime.async(function PostOrder$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          line_items = data.line_items, name = data.name, email = data.email, city = data.city, postalCode = data.postalCode, streetAddress = data.streetAddress, country = data.country;
          console.log(data);
          newId = (0, _uuid.v4)().toString();
          command = new _libDynamodb.PutCommand({
            TableName: 'Orders',
            Item: {
              id: newId,
              line_items: line_items,
              name: name,
              email: email,
              city: city,
              postalCode: postalCode,
              streetAddress: streetAddress,
              country: country,
              paid: 'false',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          });
          _context8.next = 6;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 6:
          response = _context8.sent;
          return _context8.abrupt("return", newId);

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function UpdateOrder(id) {
  var command;
  return regeneratorRuntime.async(function UpdateOrder$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          command = new _libDynamodb.UpdateCommand({
            TableName: 'Orders',
            Key: {
              id: id.toString()
            },
            UpdateExpression: 'set paid = :paid, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
              ':paid': 'true',
              ':updatedAt': new Date().toISOString()
            },
            ReturnValues: 'ALL_NEW'
          });
          _context9.next = 3;
          return regeneratorRuntime.awrap(docClient.send(command));

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}