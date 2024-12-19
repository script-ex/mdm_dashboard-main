import React from 'react'
import {useTranslation} from 'react-i18next';

function WorkplaceCaseStudy() {
    const {t, i18n} = useTranslation();
    document.body.dir = i18n.dir();

  return (
    <div style={{ padding: '0 30px' }}>
    <div>
    <h1>{t("WORKPLACE CASE STUDY")}</h1><br></br>
    <h5>{t("Title of Case:")} <u>{t("Name Calling")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("A Hispanic, in a verbal altercation with another employee shouts")}</p>
    <p>{t("The Hispanic employee was counseled by his Manager and given a one day suspension without pay")} </p>
    </div><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1  }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>

<div>
    <h5>{t("Title of Case:")} <u>{t("Silenced by Ego")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("You are a Regulatory Affairs Manager, responsible for a TAP product")} </p>
    <p>{t("During the meeting Joan begins to present an idea that you like and think will work However")}</p>
</div><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1,  }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
<div>
    <h5>{t("Title of Case:")} <u>{t("To Hire or Not To Hire")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("A minority product manager and several white product managers are all vying for apromotion to a senior product manager position.")} </p></div><br></br>
<div>
<hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <h5>{t("Title of Case:")} <u>{t("E-mail Controversy")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("Your male employee brings to your attention an obscene pornographic e-mail that several other employees")}</p> </div><br></br>
<div>
<hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <h5>{t("Title of Case:")} <u>{t("No Children Allowed")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("A finance analyst returned to her full time position, supporting a finance manager after the birth of her baby.")} </p>     
    <p>{t("After having the baby, the analyst had a talk with the manager to explain that she was no longer able to stay late,")}</p>
</div><br></br>
<hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
<div>
    <h5>{t("Title of Case:")} <u>{t("Choice of Music")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("There are 3 Christian representative and 1 Jewish representative in the customerservice department that all work in a common area.")}</p></div><br></br>
<div>
<hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <hr style={{ borderTop: '4px solid #ddd', opacity: 1 }} /><br></br>
    <h5>{t("Title of Case:")} <u>{t("Personal Relationships")}</u></h5>
    <h5>{t("Describe the situation.")}</h5>
    <p>{t("Your female manager comes in on Monday morning and tells you about her weekend, which includes her female partner.")}  </p> </div>
    
    </div>
  )
}

export default WorkplaceCaseStudy


