export class QuestionsData {
  static getOptionsForMultipleChoice(): { [key: string]: string[] } {
    return {
      'What is Finance?:': [
        'Finance is the management of money',
        'Finance is the management of people',
        'Finance is the management of time',
        ],
        'The role of Finance in an Organization:': [
          'Finance creates company logos',
          'Finance helps an organization allocate resources, manage risks, and plan for future growth',
          'Finance develops advertising campaigns',
        ],
        'Importance of Data and Technology:': [
          'Data and technology improve decision-making',
          'Data and technology reduce costs in factories',
          'Data and technology are unrelated to Finance'
        ],
        'Career in Finance:': [
          'Finance is a boring career',
          'Finance is a career with no growth opportunities',
          'A career in finance can involve roles like financial analyst, investment banker, accountant, or portfolio manager',
        ],
        'Markets and Participants:': [
          'Markets include stock, bond, and commodity markets, with participants like investors, brokers, and regulatory bodies',
          'Markets include only stock markets',
          'Markets include only bond markets',
        ],
        'Microeconomic and Macroeconomic Matters:': [
          'Microeconomics focuses on individual consumers and businesses, while Macroeconomics focuses on the economy as a whole',
          'Microeconomics focuses on the economy as a whole, while Macroeconomics focuses on individual consumers and businesses',
          'Microeconomics is unrelated to Finance',
        ],
        'Financial Instruments:': [
          'Financial instruments include stocks, bonds, derivatives, and other securities used for investment and risk management',
          'Financial instruments include only stocks',
          'Financial instruments include only bonds',
        ],
        'Concepts of Time and Value:': [
          'The time value of money emphasizes that a dollar today is worth more than a dollar tomorrow due to earning potential',
          'The time value of money emphasizes that a dollar today is worth less than a dollar tomorrow due to inflation',
          'The time value of money is unrelated to Finance',
        ]
    };
  }

  static getStatementsForTrueFalse(): { [key: string]: string[] } {
    return {
      'What is Finance?:': [
        'Finance is the management of money',
        'Finance is the management of people',
        ],
        'The role of Finance in an Organization:': [
          'Finance creates company logos',
          'Finance helps an organization allocate resources, manage risks, and plan for future growth',
        ],
        'Importance of Data and Technology:': [
          'Data and technology improve decision-making',
          'Data and technology reduce costs in factories',
        ],
        'Career in Finance:': [
          'Finance is a boring career',
          'A career in finance can involve roles like financial analyst, investment banker, accountant, or portfolio manager',
        ],
        'Markets and Participants:': [
          'Markets include stock, bond, and commodity markets, with participants like investors, brokers, and regulatory bodies',
          'Markets include only stock markets',
        ],
        'Microeconomic and Macroeconomic Matters:': [
          'Microeconomics focuses on individual consumers and businesses, while Macroeconomics focuses on the economy as a whole',
          'Microeconomics focuses on the economy as a whole, while Macroeconomics focuses on individual consumers and businesses',
        ],
        'Financial Instruments:': [
          'Financial instruments include stocks, bonds, derivatives, and other securities used for investment and risk management',
          'Financial instruments include only stocks',
        ],
        'Concepts of Time and Value:': [
          'The time value of money emphasizes that a dollar today is worth more than a dollar tomorrow due to earning potential',
          'The time value of money emphasizes that a dollar today is worth less than a dollar tomorrow due to inflation',
        ]
    };
  }
}
