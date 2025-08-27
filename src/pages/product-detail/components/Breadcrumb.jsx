import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground mx-2" />
            )}
            {item?.href ? (
              <Link
                to={item?.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item?.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item?.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;