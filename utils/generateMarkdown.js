function generateMarkdown(data) {
  return `
# ${data.title}
# ${data.name}
# ${data.description}
# ${data.license}
# ${data.repo}
# ${data.contributing}
# ${data.email}


`;
}

module.exports = generateMarkdown;


