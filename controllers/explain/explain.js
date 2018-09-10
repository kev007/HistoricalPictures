exports.getExplainMain = (req, res) => {
  res.render('explain/explainMain', {
    title: 'Hilfe'
  });
}

exports.getTutorial = (req, res) => {
  res.render('explain/tutorial', {
      title: 'Tutorial'
    });
}

exports.getIntro = (req, res) => {
  res.render('explain/intro', {
    title: 'Intro'
  });
}

exports.getFAQ = (req, res) => {
  res.render('explain/faq', {
    title: 'FAQ'
  });
}
