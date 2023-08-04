const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    message_progress_bar: "实验完成程度线",
    on_finish: function (data) {
        // jsPsych.data.displayData('csv');
        proliferate.submit({"trials": data.values()});
      }
  });

let timeline = []; 



const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p style="width: 1000px; margin-bottom: -250px">
    您被邀请参加一项研究。
    <BR><BR>您会完成一项跟语言有关的任务，例如读或听一些字、描述图片或场景、造句、或完成简单的语言游戏。
    <BR><BR>本研究中没有已知的风险、成本或不适。
    <BR><BR>您将按照公布的费率支付被发到一份补偿金您的参与费用。
    <BR><BR>
    如果您同意参与这项研究，请继续。
    <BR><BR>
    <BR><BR>
    </p>
    <p style="width: 1000px; font-size: 9pt; position: relative; top: 330px; padding-bottom: 30px; text-align: justify">
    如果您已读完此表格并决定参与此项目，请明白您的参与是自愿的，您有权随时撤回您的同意或停止参与，而不会受到惩罚或失去您原本可以享有的利益有权。 您有权拒绝回答任何问题。 您的个人隐私将在研究产生的所有已发布和书面数据中得到保护。
    <BR><BR>联系信息：问题、疑虑或投诉：如果您对本研究、其程序、风险和益处有任何问题、疑虑或投诉，请致电 (650) 723-4284 联系 Meghan Sumner 教授。如果您对这项研究的进行方式不满意，或者如果您对研究或您作为参与者的权利有任何疑虑、投诉或一般问题，请联系斯坦福机构审查委员会 (IRB) 发言与独立于研究团队的人联系 (650)-723-2480 或拨打免费电话 1-866-680-2906。 您也可以致函 Stanford IRB, Stanford University, Stanford, CA 94305-5401 或发送电子邮件至 irbnonmed@stanford.edu。
    </p>`,
    choices: ['继续'],
    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
timeline.push(irb);

/* eligibility */
const intro1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus:  `<p>只有年满 18 岁的中国国民才能完成这项研究。</p>
            <p>请与其他中国国民分享此链接，但不要多次参与此研究。您不会多次获得补偿。</p>
            <p>此实验不会超过 10 分钟，完成后您将获得 8人民币 的补偿金。</p>
            <p>点击“继续”继续。</p>`,
    choices: ['继续'],
        on_start: function() {
        jsPsych.setProgressBar(0)
    }

};
timeline.push(intro1);

const intro_chinese = {
    type: jsPsychHtmlButtonResponse,
    stimulus:  `请在一间安静的屋子里做这个实验。
    <BR><BR>请用电脑来做这个实验。
    <BR><BR>请点击“继续”继续。`,
    choices: ['继续'],

    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
timeline.push(intro_chinese);

// 仅凭感觉，按你的理解
// 方式主要指语音语调表达方式
// 日常生活中聊天
// 例如两个朋友聊天口语的差异，所在地区的区域

const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus:  `在本实验中，你将看到一张中国大陆及周边外围地区的空白地图。您将使用计算机鼠标在地图上绘制区域，这些区域显示人们说普通话不同的地方。
    <BR><BR>绘制区域后，系统会让您标记所绘制的每个区域。
    <BR><BR>然后，您将回答一系列有关您的语言背景的简短问题。
    <BR><BR>请点击“继续”继续。`,
    choices: ['继续'],
    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
timeline.push(instructions);

const map = {

  type: jsPsychSketchpad,
  prompt: '<p style="width:380px">您知道有哪些方言，请在地图上标明他们的位置及方言名称（您先画完区域以后再按“全画完了”，就可以列出您所画的方言名称了）。您所画的区域可以数量不限，大小不限，可以重叠。</p>',
  prompt_location: 'abovecanvas',
  stroke_color_palette: ['red'],
  stroke_color: 'red',
  background_image: 'china_blankmap.jpeg',
  canvas_width: 750,
  canvas_height: 550,
  show_finished_button: true,
  finished_button_label: '全画完了',
  show_clear_button: true,
  clear_button_label: '清除',
  show_undo_button: true,
  undo_button_label: '撤消',
  show_redo_button: true,
  redo_button_label: '重做',
  // choices: ['d'],
  save_final_image: true,
  on_finish: function(data) {
    console.log(data)

    // 请在以下的地图上画圈，显示您认为人们说普通话方式不同的地方。
  }


}

const label = {
  type: jsPsychSurveyText,
  preamble: () => {
    var imageData = jsPsych.data.get().last(1).values()[0].png;
    return `<img src="${imageData}"></img>`;
  },
  questions: [
    {
    prompt: '请列出您画出来所有区域的标签。',
    required: true,
    },
    
  ],
  button_label: '继续',
}

timeline.push(map);
timeline.push(label);



// let sorting_stimuli =[];
// for (var i = 1; i <= 5; i++) {
//     sorting_stimuli.push("amanda_" + i + ".wav");
// }
// console.log(sorting_stimuli)


// const sort_trial = {
//     type: jsPsychFreeSort,
//     stimuli: sorting_stimuli,
//     stim_width: 80,
//     stim_height: 60,
//     sort_area_width: 500,
//     sort_area_height: 500,
//     prompt: "<p>Click and drag the images below to sort them so that similar items are close together.</p>"
//     //choices: ['Continue'],
// };

// timeline.push(sort_trial)


// const irb = {
//     type: jsPsychHtmlButtonResponse,
//     stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
//     choices: ['Continue'],
//     on_start: function() {
//         jsPsych.setProgressBar(0)
//     }
// };
// timeline.push(irb);

// const intro_slide = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus:  `Please make sure that you are completing this experiment in a quiet room.
//     <BR><BR>This experiment should be completed on a desktop or laptop using the Google Chrome browser.
//     <BR><BR>You should use earphones or headphones for the duration of this experiment.
//     <BR><BR>Press the SPACE BAR to continue.`,
//     choices: [" "],
// };
// timeline.push(intro_slide);

// how to get things to show up in chinese

// /* survey 1: demographic questions */
const survey1 = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: `<p style="color: #000000">请回答以下的问题。</p>`,
      },
      {
        type: 'multi-choice',
        prompt: "您的公民身份是什么？",
        name: 'citizenship',
        options: ['中华人民共和国（中国）', '其他国家身份', '不想回答'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: "您的性别是什么？",
        name: 'gender',
        options: ['男性', '女性', '非二元性别', '其他性别', '不想回答'],
        required: false,
      },
      {
        type: 'drop-down',
        prompt: "您哪一年出生？",
        name: 'age',
        options: ['2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', 'Prefer not to answer'],
        required: true,
      },
      // {
      //   type: 'multi-choice',
      //   prompt: "What is your highest level of education?",
      //   name: 'education',
      //   options: ['No qualification', 'Primary school', 'Secondary school', 'Junior college/Polytechnic', 'Undergraduate degree', 'Postgraduate degree', 'Prefer not to answer'],
      //   required: false,
      // }
    ]
  ],
  on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label_finish: '继续',
};
timeline.push(survey1);


// /* survey: family questions */
const survey_family = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: `<p style="color: #000000">请回答以下的问题。</p>`,
      },

      {
        type: 'text',
        prompt: "您现在在中国住哪里？（比如，国家、省、县、城市、等等）",
        name: 'now_live',
        input_type: "text",
        required: true,
      },
      {
        type: 'text',
        prompt: "你父亲的家人来自哪里？（比如，国家、省、县、城市、等等）",
        name: 'dad_from',
        input_type: "text",
        required: true,
      },
            {
        type: 'text',
        prompt: "你母亲的家人来自哪里？（比如，国家、省、县、城市、等等）",
        name: 'mom_from',
        input_type: "text",
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "您有没有搬过家？",
        name: 'moved',
        options: ['有', '没有'],
        required: true,
      },
        {
        type: 'text',
        prompt: "如果您搬过家，您从哪里搬到哪里？大概在每个地方待得多久？",
        name: 'moved_places',
        input_type: "text",
        required: false,
      },
        {
        type: 'multi-choice',
        prompt: "您觉得自己属于北方人还是南方人？",
        name: 'north_or_south',
        options: ['北方人', '南方人', '两个都是', '两个都不是', '不想回答'],
        required: true,
      },

    ]
  ],
    on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label_finish: '继续',
};
timeline.push(survey_family);


// /* survey 2: language background questions */
const survey2a = {
  type: jsPsychSurveyHtmlForm,
  preamble: `<p>您会说哪些语言？</p>
  <p>请在以下列出最多 5 种语言，并<b>按使用频率降序排列</b>，也就是说，语言 1 是最常用的语言，语言 2 是第二常用的语言。</p>
  <p>比如，如果普通话是第一语言，粤语是第二语言，台语是第三语言，这意味着您用普通话最多，粤语第二，台语最少。
  </p>`,
  html: `<p>
  <input name="lang1" type="text" placeholder="语言 1" required><BR><BR>
  <input name="lang2" type="text" placeholder="语言 2"><BR><BR>
  <input name="lang3" type="text" placeholder="语言 3"><BR><BR>
  <input name="lang4" type="text" placeholder="语言 4"><BR><BR>
  <input name="lang5" type="text" placeholder="语言 5">
  </p>`,
  button_label: '继续',
};
timeline.push(survey2a);

const survey2b = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'multi-choice',
        prompt: "您会讲普通话吗？",
        name: 'mandarin',
        options: ['会', '不会', '不想回答'],
        required: true,
      },
      {
        type: 'text',
        prompt: "您每天大概会用几个小时的普通话？",
        name: 'mandarin_hours',
        input_type: "number",
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "您的朋友们会用普通话吗？",
        name: 'mandarin_friends',
        options: ['会', '不会', '不想回答'],
        required: true,
      },
      {
        type: 'likert',
        prompt: "您和朋友们在一起的时候会用多少普通话？",
        name: 'mandarin_friends_frequency',
        required: true,
        likert_scale_min_label: '从来不用',
        likert_scale_max_label: '我们只会用普通',
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]
      },
      {
        type: 'multi-choice',
        prompt: "您的家人会用普通话吗？",
        name: 'mandarin_family',
        options: ['会', '不会', '不想回答'],
        required: true,
      },
      {
        type: 'likert',
        prompt: "您和家人在一起的时候会用多少普通话？",
        name: 'mandarin_family_frequency',
        required: true,
        likert_scale_min_label: '从来不用',
        likert_scale_max_label: '我们只会用普通话',
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]
      },
      {
        type: 'multi-choice',
        prompt: "您的家人会用其他方言吗？",
        name: 'dialect',
        options: ['会', '不会', '不想回答'],
        required: true,
      },
      {
        type: 'text',
        prompt: "您的家人会用哪些方言？请列出来。",
        name: 'what_dialects',
        input_type: "text",
        required: false,
      },
      {
        type: 'likert',
        prompt: "您和家人在一起的时候会用多少方言？",
        name: 'dialect_family_frequency',
        required: false,
        likert_scale_min_label: '从来不用',
        likert_scale_max_label: '我们只会用方言',
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]
      },
    ],
  ],
    on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label_finish: '继续',
};
timeline.push(survey2b);


// /* payment information */
const payment_1 = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `
            <p>接下来的几页会问您要支付宝信息，以让研究人员转您补偿金。请在以下的空处提供您的支付宝email（电子邮件）（仅做转账使用）。</p>
            `,
      name: 'payment_email',
      required: true,

    }
    // button_label: '继续',
  ],
    on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label: '继续',
};
timeline.push(payment_1);

// /* payment information */
const payment_2 = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `
            <p>请在以下的空处提供您的支付宝上登记的收款人姓名（仅做转账使用）。</p>
            `,
      name: 'payment_name',
      required: true,

    }
    // button_label: '继续',
  ],
    on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label: '继续',
};
timeline.push(payment_2);

// /* payment information */
const payment_3 = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `
            <p>请在以下的空处提供您的支付宝号码（仅做转账使用）。研究人员将通过此号码来给您您参加此实验的补偿金。</p>
            `,
      name: 'payment_number'

    }
    // button_label: '继续',
  ],
    on_finish: function(data) {
      jsPsych.setProgressBar(data.trial_index/140);
    },
  button_label: '继续',
};
timeline.push(payment_3);

// /* thank u */
const thankyou = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
            <p>感谢您完成实验！</p>
            <p>我们将尽快与您联系以安排补偿金。</p>
            <p>请点击“完成”按钮提交您的回答并完成研究。</p>
      `,
  choices: ["完成"],
};
timeline.push(thankyou);

// /* future study? */
// const futurestudies = {
//   type: jsPsychSurvey,
//   pages: [
//     [
//       {
//         type: 'multi-choice',
//         prompt: "Do you consent to being contacted for future studies?",
//         name: 'futurestudies',
//         options: ['Yes', 'No'],
//         required: true,
//       }
//     ]
//   ],
//   button_label_finish: 'Continue',
// };
// timeline.push(futurestudies);

// /* thank u */
// const thankyou = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//             <p>Thank you for completing the experiment!</p>
//             <p>We will contact you soon to arrange for participant reimbursement.</p>
//             <p>Please click the "Submit" button to submit your responses and complete the study.</p>
//       `,
//   choices: ["Submit"],
// };
// timeline.push(thankyou);


jsPsych.run(timeline);


//


//


// const jsPsych = initJsPsych({
//     on_finish: function () {
//         jsPsych.data.displayData('csv');
//       }

//     //on_finish: function(data) {
//         //proliferate.submit({"trials": data.values()});
//     //}
//   });

// let timeline = [];

// // push experiment logic the timeline here...
// // ......
// const irb = {
//     // Which plugin to use
//     type: jsPsychHtmlButtonResponse,
//     // What should be displayed on the screen
//     stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
//     // What should the button(s) say
//     choices: ['Continue']
// };

// // push to the timeline
// timeline.push(irb)

// const instructions = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: "In this experiment, you will hear a series of words. If it's your first time hearing the word, press 'D' for NEW. If you've already heard the word during the task, press 'K' for OLD. Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
//     choices: [" "]
// };
// timeline.push(instructions);

// let tv_array = create_tv_array(trial_objects);
// let randomized = shuffle_array(tv_array);

// let likert_scale = [
//   "Strongly Disagree", 
//   "Disagree", 
//   "Neutral", 
//   "Agree", 
//   "Strongly Agree"
// ];

// let attributes = [
//             {prompt: "This speaker is FRIENDLY.", name: 'Friendly', labels: likert_scale},
//             {prompt: "This speaker is KIND.", name: 'Kind', labels: likert_scale},
//             {prompt: "This speaker is HONEST.", name: 'Honest', labels: likert_scale},
//             {prompt: "This speaker is LIKEABLE.", name: 'Likeable', labels: likert_scale},
//             {prompt: "This speaker is RELIABLE.", name: 'Reliable', labels: likert_scale},
//             {prompt: "This speaker is HELPFUL.", name: 'Helpful', labels: likert_scale},
//             {prompt: "This speaker is CONFIDENT.", name: 'Confident', labels: likert_scale},
//             {prompt: "This speaker is AMBITIOUS.", name: 'Ambitious', labels: likert_scale},
//             {prompt: "This speaker is INTELLIGENT.", name: 'Intelligent', labels: likert_scale},
//             {prompt: "This speaker is EDUCATED.", name: 'Educated', labels: likert_scale},
//             {prompt: "This speaker is SELF CONFIDENT.", name: 'Self Confident', labels: likert_scale},
//             {prompt: "This speaker is WEALTHY.", name: 'Wealthy', labels: likert_scale},
//             {prompt: "This speaker is LEADERSHIP.", name: 'Leadership', labels: likert_scale},
//             {prompt: "This speaker is TRUSTWORTHY.", name: 'Trustworthy', labels: likert_scale},
//             {prompt: "This speaker is SINCERE.", name: 'Sincere', labels: likert_scale},
//             {prompt: "This speaker is HUMOROUS.", name: 'Humorous', labels: likert_scale},
//             {prompt: "This speaker is MODEST.", name: 'Modest', labels: likert_scale},
//             {prompt: "This speaker is CONTENT.", name: 'Content', labels: likert_scale},
//             {prompt: "This speaker is NOT SELFISH.", name: 'Not Selfish', labels: likert_scale},
//             {prompt: "This speaker is COURTEOUS.", name: 'Courteous', labels: likert_scale},
//             {prompt: "This speaker is FAIR.", name: 'Fair', labels: likert_scale},
//             {prompt: "This speaker is OBLIGING.", name: 'Obliging', labels: likert_scale},
//             {prompt: "This speaker is DILIGENT.", name: 'Diligent', labels: likert_scale},
//             {prompt: "This speaker is SOCIAL STATUS.", name: 'Social Status', labels: likert_scale},
//             {prompt: "This speaker is NOT SUPERSTITIOUS.", name: 'Not Superstitious', labels: likert_scale},
//             {prompt: "This speaker is OPEN.", name: 'Open', labels: likert_scale},
//             {prompt: "This speaker is GOOD LOOKING.", name: 'Good Looking', labels: likert_scale},
//             {prompt: "This speaker is HAVING CHARACTER.", name: 'Having Character', labels: likert_scale},

//             ];
// let ran_attributes = shuffle_array(attributes);


// let audio_path = "";


// const trials = {
//     timeline: [
//         {
//             type: jsPsychAudioKeyboardResponse,
//             choices: ["NO_KEYS"],
//             stimulus: jsPsych.timelineVariable('stimulus'),
//             response_allowed_while_playing: false,
//             //trial_duration: 4000,
//             prompt: "Please listen to the current clip carefully.",
//             trial_ends_after_audio: true,
//             on_finish: function(data) {
//                 evaluate_response(data);
//             },
//             data: jsPsych.timelineVariable('data')
//         },

//         //`<audio controls src=` + audio_path + `></audio>`


//         // {
//         //     [
//         //       {
//         //         type: 'likert-table',
//         //         prompt: ' ',
//         //         statements: [
//         //           {prompt: 'I like to eat vegetables', name: 'VeggiesTable'},
//         //           {prompt: 'I like to eat fruit', name: 'FruitTable'},
//         //           {prompt: 'I like to eat meat', name: 'MeatTable'},
//         //         ],
//         //         options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
//         //       }
//         //     ]

//         // },
//         {
//             type: jsPsychSurveyLikert,
//             on_start: function(){
//                 audio_path = jsPsych.timelineVariables('stimulus')
//             },
//            // let new_audio_path = `<audio controls src=` + audio_path + `></audio>`
//             preamble: `<audio controls src= + audio_path + ></audio>`,
//             // preamble: `<div id="soundtrack"></div>
//             // <button onClick="setSong()">Set Song</button>`,
//             //stimulus: jsPsych.timelineVariable('stimulus'),
//             questions: function(){
//                 return ran_attributes;
//             }
//         },
//         // {
//         //   type: jsPsychSurvey,
//         //   pages: [
//         //     [
//         //       {
//         //         type: 'html',
//         //         prompt: 'Please answer the following questions:',
//         //       },
//         //       {
//         //         type: 'multi-choice',
//         //         prompt: "Which of the following do you like the most?", 
//         //         name: 'VegetablesLike', 
//         //         options: ['Tomato', 'Cucumber', 'Eggplant', 'Corn', 'Peas'], 
//         //         required: true
//         //       }, 
//         //       {
//         //         type: 'multi-select',
//         //         prompt: "Which of the following do you like?", 
//         //         name: 'FruitLike', 
//         //         options: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'], 
//         //         required: false,
//         //       },
//         //     ],
//         //   ],
//         // },
//     ],
//     timeline_variables: randomized,
//     // randomize_order: true
// }
// timeline.push(trials);

// // const trial_1 = {
// //     type: jsPsychAudioKeyboardResponse,
// //     choices: ['d', 'k'],
// //     stimulus: 'audio/Violin.wav',
// //     response_allowed_while_playing: false,
// //     trial_duration: 4000,
// //     prompt: `<div class=\"option_container\">
// //     			<div class=\"option\">NEW<br><br><b>D</b></div>
// //     			<div class=\"option\">OLD<br><br><b>K</b></div>
// //     		</div>`,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data);
// //     }
// // }

// // const trial_2 = {
// //     type: jsPsychAudioKeyboardResponse,
// //     prompt: "<div class=\"option_container\"><div class=\"option\">NEW<br><br><b>D</b></div><div class=\"option\">OLD<br><br><b>K</b></div></div>",
// //     choices: ["d", 'k'],
// //     stimulus: "audio/Bologna.wav",
// //     trial_duration: 4000,
// //     response_allowed_while_playing: false,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data)
// //     }
// // }

// // timeline.push(trial_1, trial_2);

// // const trials = {
// //     type: jsPsychAudioKeyboardResponse,
// //     choices: ['d', 'k'],
// //     response_allowed_while_playing: false,
// //     trial_duration: 4000,
// //     // randomize_order: true,
// //     prompt: `<div class=\"option_container\"><div class=\"option\">NEW<br><br><b>D</b></div><div class=\"option\">OLD<br><br><b>K</b></div></div>`,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data);
// //     },
// //     timeline: [
// //         {stimulus: 'audio/Violin.wav', data: {correct: "NEW"}},
// //         {stimulus: 'audio/Bologna.wav', data: {correct: "NEW"}},
// //         {stimulus: 'audio/Violin.wav', data: {correct: "OLD"}},
// //         {stimulus: 'audio/Bologna.wav', data: {correct: "OLD"}}
// //     ]
// // }
// // timeline.push(trials)

// // let likert_scale = [
// //   "Strongly Disagree", 
// //   "Disagree", 
// //   "Neutral", 
// //   "Agree", 
// //   "Strongly Agree"
// // ];

// // let trial_likert = {
// //   type: jsPsychSurveyLikert,
// //   questions: [
// //     {prompt: "This speaker is FRIENDLY.", name: 'Friendly', labels: likert_scale},
// //     {prompt: "This speaker is EDUCATED.", name: 'Educated', labels: likert_scale},
// //     {prompt: "This speaker is INTELLIGENT.", name: 'Intelligent', labels: likert_scale},
// //     {prompt: "This speaker is TRUSTWORTHY.", name: 'Trustworthy', labels: likert_scale},
// //   ],
//   // randomize_question_order: true //this shuffles WITHIN. get rid of this once there is the more controlled shuffle
//   //is this randomizing the order in which the attributes show up? random acros participants and consistent within particpants
//   // if not, how then?
//   // write a helper function that generates an array of the words (attributes),
//   // input into the helper function be these four objects, shuffle it, and then have that output array be the input to the questions parameter
//   // how to we make sure participants answer every single attribute? use the required: true parameter 
//   // alternate trial types, where you have one page where it's just listen to this audio
//   // the second type of trial where you embed the audio into a social questionnaire plugin and they can relisten to the same audio but 
//   // then it forces them to listen at least once
//   // use survey plugin https://www.jspsych.org/7.2/plugins/survey/
//   // then put audio inside "prompt" in the string of html text 
//   // you need a special css that is only available thru cdn

//   // const, var, or let
//   // const is constant and has to stay that way
//   // let you can change, like let array = []
//   // prompts can be just a string of text
//   // there is an html tag that you can use to embed audio (just an audio) for the prompt
//   // src is the path to the file 

//   // link stimuli to stimuli in both audio keyboard plugin and survey plugin

//   // js file for free sort, see how the icons are defined, where the paths to the photos are going, and then get into that html element
//   // then in that html element add something that can play audio

// // };

// //timeline.push(trial_likert)


// jsPsych.run(timeline)