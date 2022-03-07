// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';

export default class extends Component {
  componentDidMount() {
    if (this.props.fileType === 'docx') {
      const jsonFile = new XMLHttpRequest();
      jsonFile.open('GET', this.props.filePath, true);
      jsonFile.send();
      jsonFile.responseType = 'arraybuffer';
      jsonFile.onreadystatechange = () => {
        if (jsonFile.readyState === 4 && jsonFile.status === 200) {
          mammoth.convertToHtml(
            { arrayBuffer: jsonFile.response },
            { includeDefaultStyleMap: true },
          )
          .then((result) => {
            const docEl = document.createElement('div');
            docEl.className = 'document-container';
            docEl.innerHTML = result.value;
            document.getElementById('docx').innerHTML = docEl.outerHTML;
          })
          .catch((a) => {
            console.log('alexei: something went wrong', a);
          })
          .done();
        }
      };
    }
    // if (this.props.filetype === 'odt') {}
    // if (this.props.filetype === 'doc') {}
    if (this.props.fileType === 'txt') {
      const jsonFile = new XMLHttpRequest();
      jsonFile.open('GET', this.props.filePath, true);
      jsonFile.send();
      jsonFile.onreadystatechange = () => {
        if (jsonFile.readyState === 4 && jsonFile.status === 200) {
          console.log(jsonFile.responseText);
          const docEl = document.createElement('div');
          docEl.className = 'document-container';
          docEl.innerHTML = jsonFile.responseText;
          document.getElementById('docx').innerHTML = docEl.outerHTML;
        }
      };
    }
  }

  render() {
    return (
      <div id="docx">
        <Loading />
      </div>
    );
  }
}
