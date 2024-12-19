import React from 'react'
import {useTranslation} from 'react-i18next';

function MDMTips() {
    const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <div>
        <table className="table table-bordered">
            <caption></caption>
            <tbody>
            <tr>
                   <td><b>{t("MDM Process")}</b></td>
                    <td>{t("Tips")}</td>
                </tr>
            <tr>
                <td><b>{t("State the issue.")}</b></td>
                <td>
                    <ul>
                        <li>{t("It is useful to state the issue in the form of a 'How To' statement")}</li>
                        <li>{t("Attempt to state this in two sentences or LESS, otherwise you may not be CLEAR on the issue.")}  </li>
                        <li>{t("It is helpful to be able to describe the issue/situation using descriptions of observable behaviors")} 
                            <ul>
                                <li>{t("Do not use negative language")}</li>
                                <li>{t("Do not assume you know the motives of those involved")}</li>
                                <li>{t("Do not assume negative intent")}</li>
                                <li>{t("Do describe what you observed")}</li>
                                <li>{t("Do state what you expected")}</li>
                                <li>{t("Do state what was different from your")} </li>
                            </ul>
                        </li>
                        <li>{t("Select an issue where you have some ability to either take direct action or influence action to be taken")}</li>
                        <li>{t("If you find yourself jumping immediately to the action step, jot down the ideas that come up and then go back through the MDM steps just to see if any additional insights come up.")}</li>
                    </ul>
                </td>
            </tr>
                <tr>
                    <td><b>{t("Who is in the mix?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Include any individual or group that might be impacted by the actions you take.")} (Key Stakeholders)</li>
                            <li>{t("Include people who may not necessarily be present or even know about the situation.")} </li>
                            <li>{t("ADDITIONAL QUESTION:  Who should be in the mix?")}</li>
                            <li>{t("Consider who or what are the non-obvious elements or persons in the mix")}</li>
                            <li>{t("Don't neglect non-human elements in the mix ie. Departments, customers, legacy v. acquired, suppliers, systems, products, competitors, communities, etc.,")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td><b>{t("What are their perspectives?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("It is useful to have someone help you with this as we often have difficulty imagining how someone else may be experiencing a situation that is challenging us.")} </li>
                            <li>{t("Be sure to consider their perspectives as if you were they. It's not what you think that they think, but rather what you would think if you were in their shoes.")}</li>
                            <li>{t("Consider asking a trusted peer to offer some insight on this step.")}  </li>
                            <li>{t("Taking time to consider what others in the mix think/feel about the issue helps when you engage them to find out their actual perspective.")}  </li>
                            <li>{t("What might key stakeholders be thinking about the situation?")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What are the Causes of Tension?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Remember that tension is not good or bad but rather what people are experiencing. So tension can be caused by opportunities as well challenges.")} </li>
                            <li>{t("People with different perspectives can be experiencing the same causes of tension.")} </li>
                            <li>{t("You might ask, “if I do nothing based on the above what's most likely to happen?”")} </li>
                            <li>{t("If the response is: don't think anything, or I can move on,   then this may be a situation that only you are uncomfortable with at this point.")} </li>
                            <li>{t("However, if the response indicates some possible dire consequence")} </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What are the feelings of the people in the mix?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Causes of tension and feelings are not the same thing. Feelings are emotions such as anger, frustration, excitement, anxiety.")} </li>
                            <li>{t("Causes of tension stem from the linking of interest and reality;")}</li>
                            <li>{t("It is important to know what the feelings are because the intent is to handle a situation with the best interest of the business in mind (requirements")}</li>
                            <li>{t("Understanding feelings will help you determine how to approach the individuals in the mix.")} </li>
                            <li>{t("Once you decide on your course of action you may need to go back and have a discussion to help people")} </li>
                            <li>{t("It is also helpful to understand the feelings because they may give you insight into the kinds of actions people")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What are the Goals?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Focus on the outcomes that you are seeking in this situation.")} </li>
                            <li>{t("Keep in mind that the outcomes should not include “changing” someone else but rather requiring appropriate behavior.")} </li>
                            <li>{t("This is another good place to get some input from others.")} </li>
                            <li>{t("Get clear on REQUIREMENTS here.   Quality is a requirement.  Producing what we're hired to produce is a requirement.  Being cost effective is a requirement.  Safety and not breaking the law are requirements etc.")}
                                <ul>
                                    <li>{t("You should identify goals that will get you to the requirements as opposed to what's always done, what someone likes, or what's easiest.")}</li>
                                    <li>{t("Staying focused on the requirements will require work on everyone's part (yours as well)")}</li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What will it take to achieve the goals?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("To determine what it will take, focus on the skills, knowledge, experience and  observable behaviors, required.")} </li>
                            <li>{t("It is easy to slip into personal preference here so be sure to get someone else's eyes on what you think is required.")}  </li>
                            <li>{t("This question is critical because it introduces the potential for not only individual behavior change but also systems, policy, procedural change.")}</li>
                            <li>{t("You may want to identify both short-term and long-term goals.")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("Propose Potential Actions")} </b></td>
                    <td>
                        <ul>
                            <li>{t("This is a brainstorming process so get some input from others.")}</li>
                            <li>{t("If this issue has arisen before, consider some actions that have been tried but haven't worked and what you might do differently this time.")} </li>
                            <li>{t("Consider actions that have not yet been tried.")}</li>
                            <li>{t("Be creative here and think “outside the box.”")}</li>
                            <li>{t("Generate as many actions as you can, even if they may seem a bit implausible right now.")}</li>
                            <li>{t("Here we must look at the previous steps.  Considering the mix, the feelings and requirements, what are the natural steps to take?")}</li>
                            <li>{t("What kind of actions might influence the work more positively?")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What might be the results of these actions?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("This question is about examining the intended and unintended outcomes of any actions you might consider.")} </li>
                            <li>{t("It's important to consider what results you may be generating by taking the actions you want to take so that")}  </li>
                            <li>{t("Consider short-term and long-term results")}  </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What are the organization's cultural supports?")}</b></td>
                    <td>
                        <ul>
                            <li><b>{t("This step focuses on assessing the organization's cultural supports, not the cultural differences among people in the mix.")}</b></li>
                            <li>{t("Cultural supports are those factors in the organization (like policies, practices and behaviors")} </li>
                            <li>{t("It's important to recognize what is “normal” for your organization so that you can offer some options that will not take a lot of work to implement.")} </li>
                            <li>{t("Ask yourself, “If I bounced my plan off five colleagues, would the majority say 'that should work here'or 'that won't fly here?' “")}</li>
                            <li>{t("Examine the written or unwritten “rules” that tend to play out in the organization for clues about cultural supports and barriers.")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("How might you capitalize on organizational cultural supports?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Capitalizing on cultural supports is like playing to your strong suit.")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What are the organization's cultural barriers?")}</b></td>
                    <td>
                        <ul>
                            <li><b>{t("This step focuses on assessing the organization's cultural barriers, not the cultural differences among people in the mix.")}</b></li>
                            <li>{t("Cultural barriers are those factors in the organization (like policies and practices)")}</li>
                            <li>{t("Keep in mind that many of your solutions could be “counter-cultural”. That is, they may not be naturally supported by your culture.")} </li>
                            <li>{t("Do not let the fact, that an action may not be naturally supported by the current culture deter you from pursuing it if you believe it is the action needed.")} </li>
                            <li>{t("Identify resources that are not available, or business practices that may prevent your actions from being taken.")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("How might you overcome organizational cultural barriers?")} </b></td>
                    <td>
                        <ul>
                            <li>{t("Overcoming cultural barriers is not a task for the faint at heart. It is hard work and not without risk.")} </li>
                            <li>{t("Working to overcome cultural barriers is an effort that is essentially “challenging the status quo.”")}</li>
                            <li>{t("Growth and change do not happen if no one is willing to challenge the status quo.")} </li>
                            <li>{t("In dealing with organizational cultural barriers, focus attention on those things you can either control or influence.")}  </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("Action Planning")}</b></td>
                    <td></td>
                </tr>
                <tr>
                   <td><b>{t("Of the possible actions listed above, which actions do you plan to take?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("The best actions to choose are those which you have the greatest ability to control or influence.")}</li>
                            <li>{t("If you are not in a position of sufficient power or influence, then it is wise to either do some networking")}</li>
                            <li>{t("Consider actions in terms of long-term (generally years) and short term (generally months).")} </li>
                            <li>{t("A general rule of thumb would be to get the short-term out of the way.")}  </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("What resources might you call on? (People, materials, equipment, systems, etc.?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("In action planning and taking action, we often face greater need than the resources available.")} </li>
                            <li>{t("Appeal to the things that will interest them.")}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                   <td><b>{t("Who? Will do What? By When?")}</b></td>
                    <td>
                        <ul>
                            <li>{t("Yes. This is your project. You need to decide who you want to help you and what you want them to do.")} </li>
                            <li>{t("The short answer is: as much time as it takes. However, there may be some key deadlines or events with which you may need to coordinate,")} </li>
                            <li>{t("Be as specific as you can. Where possible be very descriptive about deliverables in terms of what they should contain,")} </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MDMTips
