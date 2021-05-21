import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyIcon from '../../assets/images/copy.svg';
import './CopyURL.scss';

const CopyURL = (props) => {
  const [copied, setCopied] = useState(false);
  const { className, hidden, ...rest } = props;
  return (
    <div className={`copy-div ${className}`}>
      <div className="copy" title="Copy to clipboard">
        {className === '' ? (
          <div className="copied-div" hidden={!copied}>
            URL copied!
            <span />
          </div>
        ) : (
          <div className="copied-div" hidden={hidden}>
            URL copied!
            <span />
          </div>
        )}
        <CopyToClipboard
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          <span>
            <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
            Copy URL
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};

CopyURL.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
};

CopyURL.defaultProps = {
  className: '',
  hidden: true,
};

export default CopyURL;
