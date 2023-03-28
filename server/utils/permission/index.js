const { fetchPagesByUserId } = require('../../controllers/api/page');

const publicPages = [
  'page', 'offer', 'portfolio', 'portfolio history wedding', 'blog'
];

// Check permission to access to page
const pagePermission = async (page) => {
  // Check for public page
  if (publicPages.includes(page)) {
    return true;
  }

  // If user session isn't set
  if (!req.user.userId) {
    return false;
  }

  // Check if user contain this page
  const Pages = await fetchPagesByUserId(req.user.userId);
  const Page = Pages.find(pageObj => pageObj.url = page);
  if (Page) {
    return true;
  }

  return false;
}

module.exports = {
  publicPages,
  pagePermission
}
