const { User } = require('../../../models');

/**
 * Get a list of users
 * @param {number} page_number
 * @param {number} page_size
 * @param {string} search
 * @param {string} sort
 * @returns {Promise}
 */
async function getUsers(page_number, page_size, search, sort) {
  search = search.split(':');
  const search_field = search[0];
  const search_key = search[1];
  let search_ = {};
  if (search_field == 'email') {
    search_ = { email: { $regex: search_key, $options: 'i' } };
  } else if (search_field == 'name') {
    search_ = { name: { $regex: search_key, $options: 'i' } };
  }

  sort = sort.split(':');
  const sort_field = sort[0];
  const sort_order = sort[1];
  let sort_by = {};
  sort_by[sort_field] = sort_order;

  // Calculate the amount of data to be skipped
  const skip = page_number * page_size;

  return User.find(search_).sort(sort_by).skip(skip).limit(page_size);
}

// count total of data
async function countUsers(search) {
  search = search.split(':');
  const search_field = search[0];
  const search_key = search[1];
  let count = {};
  if (search_field == 'email') {
    count = { email: { $regex: search_key, $options: 'i' } };
  } else if (search_field == 'name') {
    count = { name: { $regex: search_key, $options: 'i' } };
  }

  return User.countDocuments(count);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  countUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
