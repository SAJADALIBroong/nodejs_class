// Import necessary modules
const supertest = require('supertest'); // Import supertest for making HTTP requests in tests
const app = require('../server'); // Import the Express application
const ItemModel = require('../models/itemModel'); // Import the Mongoose model for items











// // Mock middleware to bypass authentication and authorization in tests
jest.mock('../middleware/admin', () => jest.fn((req, res, next) => next())); // Mock admin middleware to always pass
jest.mock('../middleware/authMiddleware', () => jest.fn((req, res, next) => next())); // Mock authentication middleware to always pass









// Include the test setup to use the in-memory MongoDB server
require('../test_utils/testSetup');




// Describe block defines a suite of tests
describe('Item Controller CRUD Operations', () => {
  // Test for adding an item
  it('should add an item and return the added item with a success message', async () => {
    const itemData = { name: 'Test Item', price: 100, description: 'A test item' }; // Define the data for the new item
    const response = await supertest(app) // Use supertest to send a POST request
      .post('/item') // POST endpoint for adding an item
      .send(itemData) // Send itemData in the request body
      .expect(200); // Assert that the HTTP status code should be 200

    // Assertions to check if the response data is correct
    expect(response.body.item).toHaveProperty('_id'); // Check if '_id' property is present
    expect(response.body.item.name).toBe(itemData.name); // Check if the name is correct
    expect(response.body.message).toBe('Item added successfully'); // Check the success message
  }, 8000); // Timeout for this test case, if needed











  
  // Test for retrieving all items
  it('should retrieve all items', async () => {
    const response = await supertest(app) // Use supertest to send a GET request
      .get('/item?admin=true') // GET endpoint for retrieving all items
      .expect(200); // Assert that the HTTP status code should be 200

    // Assertions to check the structure and message of the response
    expect(Array.isArray(response.body.items)).toBe(true); // Check if the items is an array
    expect(response.body.message).toBe('Items fetched successfully'); // Check the success message
  });




  // Test for retrieving a single item by ID
  it('should retrieve a single item by id', async () => {
    const item = await new ItemModel({ name: 'Unique Item', price: 150, description: 'A unique test item' }).save(); // Save a new item to the database
    const response = await supertest(app) // Use supertest to send a GET request
      .get(`/item/${item._id}`) // GET endpoint for retrieving a single item by ID
      .expect(200); // Assert that the HTTP status code should be 200

    // Assertions to check if the correct item is fetched
    expect(response.body.item._id.toString()).toBe(item._id.toString()); // Check if the fetched item's ID matches
    expect(response.body.message).toBe('Item fetched successfully'); // Check the success message
  });










  // Test for updating an item
  it('should update an item and return the updated item', async () => {
    const item = await new ItemModel({ name: 'Old Item', price: 100, description: 'To be updated' }).save(); // Save a new item to be updated
    const updatedData = { name: 'Updated Item' }; // Data to update the item
    const response = await supertest(app) // Use supertest to send a PUT request
      .put(`/item/${item._id}`) // PUT endpoint for updating an item
      .send(updatedData) // Send updated data in the request body
      .expect(200); // Assert that the HTTP status code should be 200

    // Assertions to confirm the item was updated
    expect(response.body.item.name).toBe(updatedData.name); // Check if the name was updated
    expect(response.body.message).toBe('Item updated successfully'); // Check the success message
  });











  // Test for deleting an item
  it('should delete an item and confirm deletion', async () => {
    const item = await new ItemModel({ name: 'Item to delete', price: 50, description: 'Delete this item' }).save(); // Save a new item to be deleted
    const response = await supertest(app) // Use supertest to send a DELETE request
      .delete(`/item/${item._id}`) // DELETE endpoint for removing an item
      .expect(200); // Assert that the HTTP status code should be 200

    // Assertions to confirm the item was deleted
    expect(response.body.message).toBe('Item deleted successfully'); // Check the success message

    // Optionally confirm that the item no longer exists in the database
    const deletedItem = await ItemModel.findById(item._id); // Query to find the deleted item
    expect(deletedItem).toBeNull(); // Expect no item to be found
  });
});
