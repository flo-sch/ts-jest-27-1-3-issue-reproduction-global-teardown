const { getJestProjects } = require('@nrwl/jest');

console.log('PROJECTS', getTestProjects());

module.exports = {
  projects: getJestProjects(),
};
