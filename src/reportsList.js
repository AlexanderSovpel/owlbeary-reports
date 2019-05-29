class ReportsList {
  constructor(document) {
    if (!document.body) {
      return [];
    }

    const paragraphs = document.body.content
      .filter(contentItem => contentItem.paragraph)
      .map(contentItem => contentItem.paragraph);

    const reports = [];

    let i = 0;
  
    for (const paragraph of paragraphs) {
      if (paragraph.paragraphStyle.namedStyleType === 'HEADING_1') {
        i += 1;
      }
  
      if (reports[i]) {
        reports[i].content.push(paragraph.elements[0].textRun.content);
      } else {
        reports[i] = {
          id: i,
          title: paragraph.elements[0].textRun.content,
          content: [],
        };
      }
    }
  
    return reports;
  }
}

export default ReportsList;