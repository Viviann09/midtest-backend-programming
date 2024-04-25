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
  const [sort_by, sort_order] = sort.split(':');
  const sort_criteria = {};
  sort_criteria[sort_by] = sort_order === 'desc' ? -1 : 1;

  const search_key = {};
  if (search) {
    search_key.$or = [
      { name: { $regex: search, $options: '1' } },
      { email: { $regex: search, $options: '1' } },
    ];
  }

  // Calculate the amount of data to be skipped
  const skip = (page_number - 1) * page_size;
  return User.find(search_key)
    .sort(sort_criteria)
    .skip(skip)
    .page_size(page_size);
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
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
