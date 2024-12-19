import React from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'block'
        }}
      >
        <div className="faq-short-cuts">
          <a onClick={() => scrollToId('state-the-issue')}>
            {t('State the issue')}
          </a>

          <a onClick={() => scrollToId('who-is-in-the-mix')}>
            {t('Who is in the mix')}
          </a>

          <a onClick={() => scrollToId('what-are-their-perspectives')}>
            {t('What are their perspectives')}
          </a>

          <a onClick={() => scrollToId('what-are-the-causes-of-tension')}>
            {t('What are the causes of tension')}
          </a>

          <a
            onClick={() =>
              scrollToId('what-are-the-feelings-of-the-people-in-the-mix')
            }
          >
            {t('What are the feelings of the people in the mix')}
          </a>

          <a onClick={() => scrollToId('what-are-the-goals')}>
            {t('What are the goals')}
          </a>

          <a
            onClick={() =>
              scrollToId('what-will-it-take-to-achieve-the-goals')
            }
          >
            {t('What will it take to achieve the goals')}
          </a>

          <a onClick={() => scrollToId('propose-potential-actions')}>
            {t('Propose potential actions')}
          </a>

          <a
            onClick={() =>
              scrollToId('what-might-be-the-results-of-these-actions')
            }
          >
            {t('What might be the results of these actions')}
          </a>

          <a
            onClick={() =>
              scrollToId('what-are-the-organizations-cultural-supports')
            }
          >
            {t("What are the organization's cultural supports")}
          </a>

          <a onClick={() => scrollToId('how-might-you-capitalize-on-them')}>
            {t('How might you capitalize on them')}
          </a>

          <a
            onClick={() =>
              scrollToId('what-are-the-organizations-cultural-barriers')
            }
          >
            {t("What are the organization's cultural barriers")}
          </a>

          <a onClick={() => scrollToId('how-might-you-overcome-them')}>
            {t('How might you overcome them')}
          </a>

          <a
            onClick={() =>
              scrollToId(
                '#of-the-possible-actions-listed-above-which-actions-do-you-plan-to-take'
              )
            }
          >
            {t(
              'Of the possible actions listed above, which actions do you plan to take'
            )}
          </a>

          <a onClick={() => scrollToId('what-resources-might-you-call-on')}>
            {t(
              'What resources might you call on? (People, materials, equipment, systems, etc.?)'
            )}
          </a>

          <a onClick={() => scrollToId('who-will-do-what-by-when')}>
            {t('Who? Will do What? By When?')}
          </a>
        </div>
      </div>
      <div>
        <div className="faq-table mx-2 mb-4">
          <div className="row mx-0 px-3">
            <div className="py-2 col-2">
              <b>{t('Frequently asked questions:')}</b>
            </div>
            <div className="py-2 col">
              <b>{t('Responses')}</b>
            </div>
          </div>
          <div className="row mx-0 px-3" id="state-the-issue">
            <div className="py-2 col-2">
              <b>{t('State the issue.')}</b>
              <ol>
                <li>{t('What kind of issue can I use?')}</li>
                <li>
                  {t(
                    'Can it be a personal issue or does it have to be business related?'
                  )}
                </li>
                <li>{t('Do I have to name names?')}</li>
                <li>{t('Can it be something that is in the past?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol>
                <li>
                  {t(
                    'The issue can relate to any of the following categories:'
                  )}
                  <br></br>
                  {t('Workforce:')} <br></br>
                  <ul>
                    <li>{t('Me & Another Person(s)')} </li>
                    <li>{t('My Group & Another Group(s)')}</li>
                  </ul>
                  {t('Workplace:')} <br></br>
                  <ul>
                    <li>
                      {t('Me and my team members, managers, supervisors')}{' '}
                    </li>
                    <li>
                      {t('Me & Another Entity (Policy, Practice, System)')}{' '}
                    </li>
                    <li>{t('My Group & Another Entity(ies)')}</li>
                  </ul>
                  {t('Marketplace:')} <br></br>
                  <ul>
                    <li>{t('Me & customers; clients, suppliers')}</li>
                    <li>
                      {t(
                        'A Community Group(s), Friend(s), Club Member(s), Social Interaction(s), Family Member(s), Stranger(s), Client(s), Customer(s), Vendor(s), Supplier(s), Distributor(s)'
                      )}
                    </li>
                    <li>{t('My Group & One (or more) of the Above')}</li>
                  </ul>
                </li>
                <li>{t('It can be either business or personal')}</li>
                <li>
                  {t(
                    'No. You can use titles or other descriptors such as, co-worker, manager, etc.'
                  )}
                </li>
                <li>
                  {t(
                    'You can use an issue that is in the past, if you want to re-think your handling of it or prepare for the possibility of it recurring.'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="who-is-in-the-mix">
            <div className="py-2 col-2">
              <b>{t('Who is in the mix?')}</b>
              <ol start={5}>
                <li>{t('Do I have to name names?')}</li>
                <li>{t('What if the persons are not actually present?')}</li>
                <li>
                  {t(
                    'Do I include people who are not concerned about the issue or don’t yet know about it?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={5}>
                <li>
                  {t(
                    'No. You can use titles or other descriptors such as, co-worker, manager, etc.'
                  )}
                </li>
                <li>
                  {t('The individuals involved do not need to be present')}
                </li>
                <li>
                  {t(
                    'You might want to at least list those who may be impacted by any actions'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="what-are-their-perspectives">
            <div className="py-2 col-2">
              <b>{t('What are their perspectives?')}</b>
              <ol start={8}>
                <li>{t('How do I know what they think about this?')}</li>
                <li>
                  {t(
                    'Do I have to include the perspectives of everyone in the mix?'
                  )}
                </li>
                <li>
                  {t(
                    'Where can I find out their perspective if I can’t talk to them or they won’t talk to me?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={8}>
                <li>
                  {t(
                    'This is an excellent and important question. Most of the time we do not know precisely what people think about a given issue unless we ask them.'
                  )}
                </li>
                <li>
                  {t(
                    'You should include the perspectives of all key players and anyone who may be able to impact the actions you choose to take.'
                  )}
                </li>
                <li>
                  {t(
                    'If you cannot verify their perspectives you can ask others who may have more access to them'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="what-are-the-causes-of-tension">
            <div className="py-2 col-2">
              <b>{t('What are the Causes of Tension?')}</b>
              <ol start={11}>
                <li>
                  {t(
                    'Can there be different causes of tension for the different people in the mix?'
                  )}
                </li>
                <li>
                  {t(
                    'Suppose someone in the mix doesn’t have any tension around this issue?'
                  )}
                </li>
                <li>
                  {t(
                    'Can tension be caused by circumstances rather than people?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={11}>
                <li>
                  {t(
                    'Yes. Different people are moved by different things. What may cause tension for one person may have no impact on another.'
                  )}
                </li>
                <li>
                  {t(
                    'If someone in the mix does not experience tension around the issue, you have probably stated that in describing their perspective.'
                  )}
                </li>
                <li>
                  {t(
                    'Yes. People frequently feel tension and anxiety that are related to the conditions or situation as opposed to another individual’s behavior.'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div
            className="row mx-0 px-3"
            id="what-are-the-feelings-of-the-people-in-the-mix"
          >
            <div className="py-2 col-2">
              <b>{t('What are the feelings of the people in the mix?')}</b>
              <ol start={14}>
                <li>{t('How do I know what people are feeling?')}</li>
                <li>
                  {t('Why is it important to know what people are feeling?')}
                </li>
                <li>{t('Shouldn’t people manage their own feelings?')}</li>
                <li>{t('Am I expected to change how people are feeling?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={14}>
                <li>
                  {t(
                    'Just as with perspectives, you cannot always be certain what people are feeling.'
                  )}
                </li>
                <li>
                  {t(
                    'Understanding what others feel about a situation will give you insight into the types of remedies you may be able to identify.'
                  )}
                </li>
                <li>
                  {t(
                    'Yes. People should, and are the only ones who can, manage their own feelings.'
                  )}
                </li>
                <li>{t('No. You cannot change how people are feeling.')}</li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="what-are-the-goals">
            <div className="py-2 col-2">
              <b>{t('What are the Goals?')}</b>
              <ol start={18}>
                <li>{t('Whose goals should I identify?')}</li>
                <li>
                  {t(
                    'What if my goals and the goals of those in the mix are different?'
                  )}
                </li>
                <li>{t('What should my goals be?')}</li>
                <li>{t('What if I know people don’t want to change?')} </li>
                <li>{t('How do I get others to buy into the goals?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={18}>
                <li>{t('You should identify your own goals.')}</li>
                <li>{t('Others may well have different goals.')}</li>
                <li>
                  {t(
                    'Your goals should be designed to address the causes of tension.'
                  )}
                </li>
                <li>
                  {t(
                    'You must focus you efforts on clearly identifying the requirements necessary to achieve the goals you set.'
                  )}
                </li>
                <li>
                  {t(
                    'If your goals take into account the various perspectives and feelings of the parties in the mix'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div
            className="row mx-0 px-3"
            id="what-will-it-take-to-achieve-the-goals"
          >
            <div className="py-2 col-2">
              <b>{t('What will it take to achieve the goals?')}</b>
              <ol start={23}>
                <li>
                  {t(
                    'What if achieving the goals means a change in company policy?'
                  )}
                </li>
                <li>{t('Can I ask people to change their behavior?')}</li>
                <li>
                  {t(
                    'What if I think that people will not be able to achieve the goals?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={23}>
                <li>
                  {t(
                    'If your goals involve policy changes, you must understand that this will take time, patience and persistence.'
                  )}
                </li>
                <li>
                  {t(
                    'Yes. If those changes are consistent with the expectations or aspirations of the organization'
                  )}
                </li>
                <li>
                  {t(
                    'If you believe the goals you set are beyond others’ capability'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="propose-potential-actions">
            <div className="py-2 col-2">
              <b>{t('Propose Potential Actions')} </b>
              <ol start={26}>
                <li>{t('What kinds of actions should I be looking for?')}</li>
                <li>{t('How radical can I get?')}</li>
                <li>{t('How do I get others to buy into these actions?')}</li>
                <li>{t('What if the actions have already been tried?')}</li>
                <li>
                  {t(
                    'What if the actions are not things that we normally do in our organization?'
                  )}
                </li>
                <li>
                  {t(
                    'What if the actions will need senior management (or some other) level of support?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={26}>
                <li>
                  {t('You should be seeking actions that:')}
                  <ul>
                    <li>{t('Are required to achieve the goals')}</li>
                    <li>{t('Address the causes of tension')}</li>
                    <li>{t('Take perspectives and feelings into account')}</li>
                    <li>{t('Are observable, achievable and measurable')}</li>
                    <li>
                      {t(
                        'May be different from anything that has been tried before'
                      )}
                    </li>
                    <li>
                      {t(
                        'May be a revision of something that was tried but did not work then'
                      )}
                    </li>
                    <li>{t('Are differences in behavior or process')} </li>
                  </ul>
                </li>
                <li>
                  {t(
                    'Theoretically your actions can be as radical as you like.'
                  )}
                </li>
                <li>
                  {t(
                    'If your actions take into account the various perspectives'
                  )}
                </li>
                <li>
                  {t(
                    'It’s possible that the actions you want to take have been tried before and may not have worked.'
                  )}
                </li>
                <li>
                  {t(
                    'Things that are not normally done in an organization are considered'
                  )}
                </li>
                <li>
                  {t(
                    'Very often it is necessary to get support for change from a variety of sources.'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div
            className="row mx-0 px-3"
            id="what-might-be-the-results-of-these-actions"
          >
            <div className="py-2 col-2">
              <b>{t('What might be the results of these actions?')}</b>
              <ol start={32}>
                <li>{t('How can I know what the results will be?')}</li>
                <li>
                  {t(
                    'Why should I be considering this if I haven’t done anything yet?'
                  )}
                </li>
                <li>
                  {t('What if there are results that I don’t anticipate?')}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={32}>
                <li>
                  {t('You cannot be sure of the eventual results.')}
                  <ul>
                    <li>
                      {t('How you might influence others to support you')}
                    </li>
                    <li>
                      {t(
                        'The kinds of intended and unintended consequences for which you need to be prepared'
                      )}
                    </li>
                    <li>
                      {t(
                        'Some possible pitfalls of undertaking this course of action'
                      )}
                    </li>
                  </ul>
                </li>
                <li>
                  {t(
                    'Giving some thought to the kinds of intended and unintended'
                  )}
                </li>
                <li>
                  {t(
                    'This is always a possibility. You are asking how I can be prepared for the unexpected.'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div
            className="row mx-0 px-3"
            id="what-are-the-organizations-cultural-supports"
          >
            <div className="py-2 col-2">
              <b>{t("What are the organization's cultural supports?")}</b>
              <ol start={35}>
                <li>{t('What do you mean by cultural supports?')}</li>
                <li>{t('What types of things would be cultural supports?')}</li>
                <li>
                  {t(
                    'Where would I find out if there are cultural supports for these actions?'
                  )}
                </li>
                <li>
                  {t(
                    'Do I have to look for cultural supports for each action on the list?'
                  )}
                </li>
                <li>{t('How many actions do I need to identify?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={35}>
                <li>
                  {t(
                    'Organizational Cultural supports are those factors in the'
                  )}
                </li>
                <li>
                  {t(
                    'The types of things that are cultural supports are those'
                  )}
                </li>
                <li>
                  {t(
                    'Look at the policy statements, company value statements,'
                  )}
                </li>
                <li>
                  {t(
                    'No. Just look for supports for the actions you intend to take.'
                  )}
                </li>
                <li>
                  {t(
                    'You need to identify only as many as you need to meet your goals.'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="how-might-you-capitalize-on-them">
            <div className="py-2 col-2">
              <b>{t('How might you capitalize on them?')}</b>
              <ol start={40}>
                <li>
                  {t(
                    'What kinds of things would I do to capitalize on cultural supports?'
                  )}
                </li>
                <li>
                  {t(
                    'Who should I look to for help to implement the actions I want to take?'
                  )}
                </li>
                <li>
                  {t(
                    'What if I am wrong about the actions I think are supported by the organization?'
                  )}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={40}>
                <li>
                  {t(
                    'To capitalize on cultural supports you would link your actions'
                  )}
                </li>
                <li>
                  {t(
                    'Start with the people in the mix who have a strong interest in'
                  )}
                </li>
                <li>
                  {t(
                    'If you discover your error before you launch any action, you'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div
            className="row mx-0 px-3"
            id="what-are-the-organizations-cultural-barriers"
          >
            <div className="py-2 col-2">
              <b>{t("What are the organization's cultural barriers?")}</b>
              <ol start={43}>
                <li>{t('What kinds of barriers might I encounter?')}</li>
                <li>
                  {t(
                    'How do I know that something is a cultural barrier if it has never been tried before?'
                  )}
                </li>
                <li>
                  {t(
                    'Why would I want to take an action that the organization would not support?'
                  )}
                </li>
                <li>
                  {t(
                    'Who should I get to help me manage through the barriers?'
                  )}
                </li>
                <li>
                  {t('What if there is a barrier that I don’t anticipate?')}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={43}>
                <li>
                  {t(
                    'The organizational cultural barriers you could encounter may'
                  )}
                </li>
                <li>
                  {t(
                    'Sometimes the fact that something has not been tried before is'
                  )}
                </li>
                <li>
                  {t('Very often an issue comes up because the organizational')}
                </li>
                <li>
                  {t(
                    "It is useful to engage people who are very 'company savvy.'"
                  )}
                </li>
                <li>
                  {t(
                    'This is always a possibility. You are asking how I can be'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="how-might-you-overcome-them">
            <div className="py-2 col-2">
              <b>{t('How might you overcome them?')} </b>
              <ol start={48}>
                <li>
                  {t(
                    'How do I know the right people to get to support my efforts?'
                  )}
                </li>
                <li>
                  {t('How do I get to the right people to support my efforts?')}
                </li>
                <li>
                  {t(
                    'What if the actions I think need to be taken can put my career in jeopardy?'
                  )}
                </li>
                <li>
                  {t(
                    'What do I do if I can’t get the support I need to take the action?'
                  )}
                </li>
                <li>{t('What if the actions don’t work?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={48}>
                <li>
                  {t(
                    'You may have to check with the people in the mix to help'
                  )}
                </li>
                <li>
                  {t(
                    'Getting to the right people can be tricky. This is where you'
                  )}
                </li>
                <li>
                  {t(
                    'This is what may be called a Principal Issue. If the risk in'
                  )}
                </li>
                <li>
                  {t(
                    'If you cannot garner support for the action you want to take,'
                  )}
                </li>
                <li>
                  {t('If you try and fail, try, try again. But before you do,')}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3">
            <div className="py-2 col-2">
              <b>{t('Action Planning')}</b>
            </div>
            <div className="py-2 col"></div>
          </div>
          <div
            className="row mx-0 px-3"
            id="of-the-possible-actions-listed-above-which-actions-do-you-plan-to-take"
          >
            <div className="py-2 col-2">
              <b>
                {t(
                  'Of the possible actions listed above, which actions do you plan to take?'
                )}
              </b>
              <ol start={53}>
                <li>{t('Which actions are best to select?')}</li>
                <li>
                  {t(
                    'What if I can’t carry out the action due to lack of position or the power to influence?'
                  )}
                </li>
                <li>{t('How long should it take to complete the action?')}</li>
                <li>
                  {t('Should I start with the long-term or short –term first?')}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={53}>
                <li>
                  {t('The best actions to choose are those which you have the')}
                </li>
                <li>
                  {t(
                    'If you are not in a position of sufficient power or influence,'
                  )}
                </li>
                <li>
                  {t(
                    'Consider actions in terms of long-term (generally years) and'
                  )}
                </li>
                <li>
                  {t(
                    'A general rule of thumb would be to get the short-term out of'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="what-resources-might-you-call-on">
            <div className="py-2 col-2">
              <b>
                {t(
                  'What resources might you call on? (People, materials, equipment, systems, etc.?'
                )}
              </b>
              <ol start={57}>
                <li>
                  {t('What if I need more resources than we have available?')}
                </li>
                <li>{t('How do I convince others to support this action?')}</li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={57}>
                <li>
                  {t(
                    'In action planning and taking action, we often face greater'
                  )}
                </li>
                <li>
                  {t(
                    'Appeal to the things that will interest them. Realize that the'
                  )}
                </li>
              </ol>
            </div>
          </div>
          <div className="row mx-0 px-3" id="who-will-do-what-by-when">
            <div className="py-2 col-2">
              <b>{t('Who? Will do What? By When?')}</b>
              <ol start={59}>
                <li>{t('Should I make assignments for others?')}</li>
                <li>{t('How much time should I allow?')}</li>
                <li>
                  {t('How specific must I be about what I need others to do?')}
                </li>
              </ol>
            </div>
            <div className="py-2 col">
              <ol start={59}>
                <li>
                  {t(
                    'Yes. This is your project. You need to decide who you want to'
                  )}
                </li>
                <li>
                  {t(
                    'The short answer is: as much time as it takes. However, there'
                  )}
                </li>
                <li>
                  {t(
                    'Be as specific as you can. Where possible be very descriptive'
                  )}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
