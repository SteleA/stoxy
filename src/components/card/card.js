import React from 'react';


export default ({title, subtitle, description, actions}) => {
  return (
    <div className="mdc-card demo-card">
      <section className="mdc-card__primary">
        {title && <h1 className="mdc-card__title mdc-card__title--large">{title}</h1>}
        {subtitle && <h2 className="mdc-card__subtitle">{subtitle}</h2>}
      </section>
      {description && <section className="mdc-card__supporting-text">
        {description}
      </section>}
      {actions && <section className="mdc-card__actions">
        {actions.map(action =>
            <button
              key={action.id}
              onClick={() => action.callBack(action)}
              className="mdc-button mdc-button--compact mdc-card__action"
            >{action.name}</button>)}
      </section>}
    </div>
  )
}
