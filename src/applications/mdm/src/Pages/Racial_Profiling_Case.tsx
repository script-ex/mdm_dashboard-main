import React from 'react'
import {useTranslation} from 'react-i18next';

function RacialProfilingCase() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <div>
      <h1>{t("A SOCIETAL DIVERSITY CHALLENGE")} </h1><br></br>
      <h2>{t("Racial Profiling")}</h2>
      <p>{t("Racial profiling, the identification of suspected lawbreakers based solely on race,")}</p><br></br>
      <p>{t("It is becoming public information that the use of race alone to stop and search individuals is widespread throughout the country.")}</p><br></br>
      <p>{t("The President of the Boston Fraternal Order of Police is quoted as saying,")}  </p><br></br>
      <p>{t("In Maryland, the State Police, as part of a settlement of an American Civil Liberties Union (ACLU) lawsuit")} </p><br></br>
      <p>{t("The ACLU deemed this statistic unacceptable. There seemed to have been no sensitivity to")}</p><br></br>
      <p>{t("Houston, the nation's fourth-largest city, San Diego and San Jose, California")} </p><br></br>
      <p>{t("In June, President Clinton issued an executive order calling for federal law-enforcement agencies to collect race")}</p><br></br>
      <p>{t("The way law enforcement officers perceive blacks and other minorities")} </p><br></br>
    </div>
  )
}

export default RacialProfilingCase
