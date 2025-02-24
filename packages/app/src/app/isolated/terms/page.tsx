import { Card, CardSection } from '@/astaria/components/Card'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page/Page'
import { SupportLink } from '@/astaria/components/SupportLink'
import { TextLink } from '@/astaria/components/TextLink'
import { APP_DATA, APP_TERMS } from '@/astaria/config/config'
import { CONTACT_EMAIL } from '@/astaria/constants/emails'

////////////////////////////////////////////////////////////////
//  IMPORTANT: DO *NOT* UPDATE THE CONTENTS OF THIS FILE!!!   //
////////////////////////////////////////////////////////////////

const TermsOfUsePage = () => (
  <Page size="paper">
    <Heading className="mb-6 text-center" level={1}>
      Astaria Terms of Use
    </Heading>

    <Card>
      <CardSection>
        <Heading className="mb-4" level={3}>
          1. Terms and Conditions
        </Heading>

        <p>
          The {APP_DATA?.NAME} products and software (the &quot;
          {APP_DATA?.NAME} Products&quot;) are a suite of smart contracts on the Ethereum Blockchain that include
          multiple products governed by smart contracts, including, but not limited to:
        </p>

        <ul className="list-disc px-8 text-sm">
          {APP_TERMS?.ONLINE_PROPERTIES.map(({ href, name }) => (
            <li key={name}>
              <span className="bold">
                {name} (<TextLink href={href}>{href}</TextLink>)
              </span>
            </li>
          ))}
        </ul>

        <p>
          Besides the smart contracts, the websites for the {APP_DATA?.NAME} Products include additional text, images,
          audio, code and other materials (collectively, the &quot;Content&quot;).{' '}
          {APP_TERMS?.TOKENS && APP_TERMS?.TOKENS?.length > 0 ? (
            <span>
              In addition, some of the {APP_DATA?.NAME} Products include associated tokens, e.g.{' '}
              {APP_TERMS?.TOKENS.map(
                (token, appTokensIndex) => `${token}${appTokensIndex !== APP_TERMS?.TOKENS.length - 1 ? ',' : ''} `,
              )}
              and any derivatives thereof (the &quot;Tokens&quot;).
            </span>
          ) : null}
        </p>

        <p>
          <span className="bold">
            There are numerous ways the {APP_DATA?.NAME} Products could fail in an unexpected way, resulting in the
            total and absolute loss in the value of your funds.{' '}
          </span>
          Please read these Terms of Use (the &quot;Terms&quot; or &quot;Terms of Use&quot;) carefully before using the
          Service. By using or otherwise accessing the Service, or clicking to accept or agree to these Terms where that
          option is made available, you (1) accept and agree to these Terms and (2) any additional terms, rules and
          conditions of participation issued from time to time. If you do not agree to the Terms, then you may not
          access or use the Content or {APP_DATA?.NAME} Products.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          2. Modification of Terms of Use
        </Heading>

        <p>
          These Terms may be discretionarily modified or replaced at any time, unless stated otherwise herein. The most
          current version of these Terms will be posted on the Interface with the &quot;Last Revised&quot; date at the
          top of the Terms changed. Any changes or modifications will be effective immediately upon posting the
          revisions to the Interface. You shall be responsible for reviewing and becoming familiar with any such
          modifications. You waive any right you may have to receive specific notice of such changes or modifications.
          Use of the Interface by you after any modification to the Terms constitutes your acceptance of the Terms as
          modified. If you do not agree to the Terms in effect when you access or use the Interface, you must stop using
          the Interface.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          3. Eligibility
        </Heading>

        <p>
          You hereby represent and warrant that you are fully able and competent to enter into the terms, conditions,
          obligations, affirmations, representations and warranties set forth in these Terms and to abide by and comply
          with these Terms. The {APP_DATA?.NAME} Products are global and by accessing the {APP_DATA?.NAME} Products, you
          are representing and warranting that, you are of the legal age of majority in your jurisdiction as is required
          to access the {APP_DATA?.NAME} Products and enter into arrangements. You further represent that you are
          otherwise legally permitted to use the service in your jurisdiction including owning cryptographic tokens of
          value, and interacting with the the {APP_DATA?.NAME} Products. You further represent you are responsible for
          ensuring compliance with the laws of your jurisdiction and acknowledge that neither the {APP_DATA?.NAME}{' '}
          Products NOR ANY RELATED ENTITIES AND AGENTS (&quot;RELATED ENTITIES AND AGENTS includes at least, but is not
          limited to, (1) the owners of, or contributors to, the {APP_DATA?.NAME} Products; and
          {APP_TERMS?.LEGAL_ENTITIES.map(({ ADDRESS, NAME }, index) => {
            const OFFSET_FOR_OWNERS_TEXT_ABOVE = 2
            return (
              <span key={NAME}>
                ({index + OFFSET_FOR_OWNERS_TEXT_ABOVE}) {NAME}
                {ADDRESS ? ` (${ADDRESS})` : null}, any founders, employees and/or contractors to {NAME}
                {index !== APP_TERMS?.LEGAL_ENTITIES.length - 1 ? ', ' : null}
              </span>
            )
          })}
          ) are liable for your compliance with such laws. Finally, you represent and warrant that you will not use the{' '}
          {APP_DATA?.NAME} Products for any illegal activity.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          4. Representations, Warranties, and Risks
        </Heading>

        <Heading className="mt-6 mb-3" level={4}>
          4.1. No Representation or Warranty
        </Heading>

        <p>
          You expressly understand and agree that your use of the Service is at your sole risk. (A) THE{' '}
          {APP_DATA?.NAME.toUpperCase()} PRODUCTS and ANY RELATED ENTITIES AND AGENTS (HEREINAFTER THE
          &quot;PROTOCOL&quot;) EXPRESSLY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED OR STATUTORY;
          AND (B) WITH RESPECT TO THE {APP_DATA?.NAME.toUpperCase()} PRODUCTS, THE PROTOCOL SPECIFICALLY DOES NOT
          REPRESENT AND WARRANT AND EXPRESSLY DISCLAIMs ANY REPRESENTATION OR WARRANTY, EXPRESS, IMPLIED OR STATUTORY,
          INCLUDING WITHOUT LIMITATION, ANY REPRESENTATIONS OR WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY,
          USAGE, SECURITY, SUITABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE, OR AS TO THE WORKMANSHIP OR TECHNICAL
          CODING THEREOF, OR THE ABSENCE OF ANY DEFECTS THEREIN, WHETHER LATENT OR PATENT. THE PROTOCOL DOES NOT
          REPRESENT OR WARRANT THAT THE SERVICE AND ANY RELATED INFORMATION ARE ACCURATE, COMPLETE, RELIABLE, CURRENT OR
          ERROR-FREE.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.2. Disclaimer of Fiduciary Duties
        </Heading>

        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW AND NOTWITHSTANDING ANY OTHER PROVISION OF THIS AGREEMENT OR ANY OTHER
          AGREEMENT CONTEMPLATED HEREIN OR APPLICABLE PROVISIONS OF LAW OR EQUITY OR OTHERWISE, THE PARTIES HERETO
          HEREBY AGREE TO ELIMINATE ANY AND ALL FIDUCIARY DUTIES THE PROTOCOL (INCLUDING ANY FOUNDERS, CONTRACTORS, OR
          CONTRIBUTORS) MAY HAVE TO THE USER, ITS AFFILIATES, THE END USERS OF THE {APP_DATA?.NAME.toUpperCase()}{' '}
          PRODUCTS, OR THE CONTENT, OR HOLDERS OF THE TOKENS.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.3. Sophistication and Risk of Cryptographic Systems
        </Heading>

        <p>
          By utilizing the {APP_DATA?.NAME} Products, Tokens, or interacting with the Content in any way, you represent
          that you understand the inherent risks associated with cryptographic systems; and warrant that you have an
          understanding of the usage and intricacies of native cryptographic tokens, like Ether (ETH) and smart contract
          based tokens such as those that follow the{' '}
          <TextLink href="https://github.com/ethereum/EIPs/issues/20">Ethereum Token Standard</TextLink>, and
          blockchain-based software systems. Neither the {APP_DATA?.NAME} Products nor any RELATED ENTITIES AND AGENTS
          owns or controls any of the underlying software through which blockchain networks are formed. In general, the
          underlying software for blockchain networks tends to be open source such that anyone can use, copy, modify,
          and distribute it. By using the {APP_DATA?.NAME} Products, you acknowledge and agree (i) the Protocol is not
          responsible for operation of the underlying software and networks that there exists no guarantee of
          functionality, security, or availability of such software and networks; and (ii) that the underlying protocols
          are subject to sudden changes in operating rules (known as &quot;Forks&quot;), and that such Forks may
          materially affect the Protocol. It might be discretionarily decided not to support (or cease supporting) the
          Forked network entirely. You acknowledge and agree that the Protocol assumes absolutely no responsibility
          whatsoever in respect of any underlying software protocols, whether Forked or not.{' '}
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.4. Risk of Regulatory Actions in One or More Jurisdictions
        </Heading>

        <p>
          The Protocol, the {APP_DATA?.NAME} Products, the Tokens and ETH could be impacted by one or more regulatory
          inquiries or regulatory action, which could impede or limit the ability of the Protocol to continue to
          develop, or which could impede or limit your ability to access or use the Service or Ethereum blockchain,
          including access to your funds.{' '}
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.5. Risk of Weaknesses or Exploits in the Field of Cryptography
        </Heading>

        <p>
          You acknowledge and understand that Cryptography is a progressing field. Advances in code cracking or
          technical advances such as the development of quantum computers may present risks to cryptocurrencies and the
          Protocol, the {APP_DATA?.NAME} Products or accessing Content, which could result in the theft or loss of your
          cryptographic tokens or property. By using the Protocol, Interface or accessing Content, you acknowledge these
          inherent risks.
        </p>

        <p>
          While the Protocol, from time to time at its own discretion, may request security audits of the{' '}
          {APP_DATA?.NAME} Products, these audits are for informational purposes only. You understand that they are just
          the security analysis performed by one entity or individual and are not to be relied upon. They are not meant
          to guarantee or otherwise represent full security of the system.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.6. Volatility of Cryptocurrency
        </Heading>

        <p>
          You understand that Ethereum and other blockchain technologies and associated currencies or tokens are highly
          volatile due to many factors including but not limited to adoption, speculation, technology and security
          risks. You also acknowledge that the cost of transacting on such technologies is variable and may increase at
          any time causing impact to any activities taking place on the Ethereum blockchain. You acknowledge these risks
          and represent that the Protocol or any related entity or person cannot be held liable for such fluctuations or
          increased costs.{' '}
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.7. Application Security
        </Heading>

        <p>
          You acknowledge that the Protocol and the {APP_DATA?.NAME} Products and Tokens are subject to flaws and
          acknowledge that you are solely responsible for evaluating any code provided by the Protocol. This warning and
          others later provided by Protocol in no way evidence or represent an on-going duty to alert you to all of the
          potential risks of utilizing the Protocol, {APP_DATA?.NAME} Products or accessing Content. You further
          acknowledge that while the Protocol may engage security audits from time to time, these audits are for
          informational purposes only. They are not meant to guarantee or otherwise represent full security of the
          applications.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.8. Website Accuracy
        </Heading>

        <p>
          Although it is intended to provide accurate and timely information on the Interface and other tools making up
          the Protocol, the {APP_DATA?.NAME} Products (including, without limitation, the Content) or relevant tools may
          not always be entirely accurate, complete or current and may also include technical inaccuracies or
          typographical errors. In an effort to continue to provide you with as complete and accurate information as
          possible, information may be changed or updated from time to time without notice, including without limitation
          information regarding our policies. Accordingly, you should verify all information before relying on it, and
          all decisions based on information contained on the {APP_DATA?.NAME} Products or relevant tools are your sole
          responsibility and the Protocol shall have no liability for such decisions. Links to third-party materials
          (including without limitation websites) and discussions on social media platforms such as Twitter and Discord
          may be provided as a convenience but are not controlled by any entity. You acknowledge and agree that we are
          not responsible for any aspect of the information, content, or services contained in any third-party materials
          or on any third party sites accessible or linked to the {APP_DATA?.NAME} Products or available via other
          relevant tools.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.9. Technical Knowledge
        </Heading>

        <p>
          Any use or interaction with the Protocol and {APP_DATA?.NAME} Products requires a comprehensive understanding
          of cryptocurrency systems in order to appreciate inherent risks, including those listed above. You represent
          and warrant that you possess relevant knowledge and skills.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          5. Indemnity
        </Heading>

        <p>
          You agree to release and to indemnify, defend and hold harmless {APP_DATA?.NAME} and any related entities, as
          well as the officers, directors, employees, contractors, contributors, shareholders and representatives of any
          of the foregoing entities, from and against any and all losses, liabilities, expenses, damages, costs
          (including attorneys&apos; fees, fees or penalties imposed by any regulatory authority and court costs) claims
          or actions of any kind whatsoever arising or resulting from your use of the {APP_DATA?.NAME} Products, your
          violation of these Terms of Use, your violation of any law, rule, or regulation, or the rights of any third
          party, and any of your acts or omissions that implicate publicity rights, defamation or invasion of privacy.{' '}
          {APP_DATA?.NAME} reserves the right, at its own expense, to assume exclusive defense and control of any matter
          otherwise subject to indemnification by you and, in such case, you agree to cooperate with {APP_DATA?.NAME} in
          the defense of such matter.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          6. Limitation on Liability
        </Heading>

        <p>
          YOU ACKNOWLEDGE AND AGREE THAT YOU ASSUME FULL RESPONSIBILITY FOR YOUR USE OF THE SITE AND SERVICE. YOU
          ACKNOWLEDGE AND AGREE THAT ANY INFORMATION YOU SEND OR RECEIVE DURING YOUR USE OF THE SITE AND SERVICE MAY NOT
          BE SECURE AND MAY BE INTERCEPTED OR LATER ACQUIRED BY UNAUTHORIZED PARTIES. YOU ACKNOWLEDGE AND AGREE THAT
          YOUR USE OF THE SITE AND SERVICE IS AT YOUR OWN RISK. RECOGNIZING SUCH, YOU UNDERSTAND AND AGREE THAT, TO THE
          FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NEITHER THE PROTOCOL NOR ANY RELATED ENTITIES, SUPPLIERS OR
          LICENSORS WILL BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE,
          EXEMPLARY OR OTHER DAMAGES OF ANY KIND, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL,
          USE, DATA OR OTHER TANGIBLE OR INTANGIBLE LOSSES OR ANY OTHER DAMAGES BASED ON CONTRACT, TORT, STRICT
          LIABILITY OR ANY OTHER THEORY (EVEN IF THE PROTOCOL OR RELATED ENTITIES HAD BEEN ADVISED OF THE POSSIBILITY OF
          SUCH DAMAGES), RESULTING FROM THE SITE OR SERVICE; THE USE OR THE INABILITY TO USE THE SITE OR SERVICE;
          UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; STATEMENTS OR CONDUCT OF ANY THIRD PARTY
          ON THE SITE OR SERVICE; ANY ACTIONS WE TAKE OR FAIL TO TAKE AS A RESULT OF COMMUNICATIONS YOU SEND TO US;
          HUMAN ERRORS; TECHNICAL MALFUNCTIONS; FAILURES, INCLUDING PUBLIC UTILITY OR TELEPHONE OUTAGES; OMISSIONS,
          INTERRUPTIONS, LATENCY, DELETIONS OR DEFECTS OF ANY DEVICE OR NETWORK, PROVIDERS, OR SOFTWARE (INCLUDING, BUT
          NOT LIMITED TO, THOSE THAT DO NOT PERMIT PARTICIPATION IN THE SERVICE); ANY INJURY OR DAMAGE TO COMPUTER
          EQUIPMENT; INABILITY TO FULLY ACCESS THE SITE OR SERVICE OR ANY OTHER WEBSITE; THEFT, TAMPERING, DESTRUCTION,
          OR UNAUTHORIZED ACCESS TO, IMAGES OR OTHER CONTENT OF ANY KIND; DATA THAT IS PROCESSED LATE OR INCORRECTLY OR
          IS INCOMPLETE OR LOST; TYPOGRAPHICAL, PRINTING OR OTHER ERRORS, OR ANY COMBINATION THEREOF; OR ANY OTHER
          MATTER RELATING TO THE SITE OR SERVICE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR
          THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE
          ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
        </p>

        <p>
          YOU FURTHER UNDERSTAND THAT THE PROTOCOL WAS INITIALLY DEVELOPED BY A SET OF FOUNDERS AND THEN BY A COMMUNITY
          OF DAO CONTRIBUTORS AND CONTRACTORS. WHILE THOSE INDIVIDUALS MAY HAVE BEEN INVOLVED IN THE{' '}
          {APP_DATA?.NAME.toUpperCase()} PRODUCTS, TO THE EXTENT ANY LIABILITY IS PERMITTED BY LAW, YOU AGREE THAT YOU
          WILL SEEK ONLY DAMAGES FROM {APP_TERMS?.LEGAL_ENTITIES.at(0)?.NAME.toUpperCase()} AND THAT YOU RELEASE ALL
          INDIVIDUALS IN THEIR PERSONAL CAPACITY.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          7. Proprietary Rights
        </Heading>

        <p>
          All title, ownership and intellectual property rights in and to the Interface and the Protocol are owned by
          the Protocol, related entities or their licensors. You acknowledge and agree that the Protocol,
          {APP_DATA?.NAME} Products and Content contain proprietary and confidential information that is protected by
          applicable intellectual property and other laws. Except as expressly authorized by a relevant entity, you
          agree not to copy, modify, rent, lease, loan, sell, distribute, perform, display or create derivative works
          based on the Protocol, {APP_DATA?.NAME} Products and Content, in whole or in part.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          8. Links
        </Heading>

        <p>
          The Service provides, or third parties may provide, links to other World Wide Web or accessible sites,
          applications or resources. Because none of the Protocol have control over such sites, applications and
          resources, you acknowledge and agree that Protocol or any related entity is not responsible for the
          availability of such external sites, applications or resources, and does not endorse and is not responsible or
          liable for any content, advertising, products or other materials on or available from such sites or resources.
          You further acknowledge and agree that Protocol or any related entity shall not be responsible or liable,
          directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of
          or reliance on any such content, goods or services available on or through any such site or resource.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          9. Termination and Suspension
        </Heading>

        <p>
          The Protocol may terminate or suspend access to the Interface immediately, without prior notice or liability,
          if you breach any of the terms or conditions of the Terms. Upon termination of your access, your right to use
          the Interface will immediately cease. The following provisions of the Terms survive any termination of these
          Terms: INDEMNITY; WARRANTY DISCLAIMERS; LIMITATION ON LIABILITY; OUR PROPRIETARY RIGHTS; LINKS; TERMINATION;
          NO THIRD-PARTY BENEFICIARIES; BINDING ARBITRATION AND CLASS ACTION WAIVER; GENERAL INFORMATION.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          10. No Third-Party Beneficiaries
        </Heading>

        <p>
          You agree that, except as otherwise expressly provided in these Terms, there shall be no third party
          beneficiaries to the Terms.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          11. Notice and Procedure For Making Claims of Copyright Infringement
        </Heading>

        <p>
          If you believe that your copyright or the copyright of a person on whose behalf you are authorized to act has
          been infringed, please provide a written Notice (<SupportLink type="email">{CONTACT_EMAIL}</SupportLink>)
          containing the following information:
        </p>

        <ul className="list-disc space-y-1 pl-8 text-sm">
          <li>
            an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright
            or other intellectual property interest;
          </li>
          <li>
            a description of the copyrighted work or other intellectual property that you claim has been infringed;
          </li>
          <li>a description of where the material that you claim is infringing is located on the Service;</li>
          <li>your address, telephone number, and email address;</li>
          <li>
            a statement by you that you have a good faith belief that the disputed use is not authorized by the
            copyright owner, its agent, or the law;
          </li>
          <li>
            a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and
            that you are the copyright or intellectual property owner or authorized to act on the copyright or
            intellectual property owner&apos;s behalf.
          </li>
        </ul>

        <Heading className="mt-6 mb-4" level={3}>
          12. Arbitration and Class Action Waiver
        </Heading>

        <Heading className="mt-6 mb-3" level={4}>
          12.1. Initial Dispute Resolution
        </Heading>

        <p>
          The parties agree shall use their best efforts to engage directly to settle any dispute, claim, question, or
          disagreement and engage in good faith negotiations which shall be a condition to either party initiating an
          arbitration.{' '}
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          12.2. Binding Arbitration
        </Heading>

        <p>
          If we cannot resolve the dispute through good-faith negotiations, you and we agree that any dispute arising
          under this Agreement shall be finally settled in binding arbitration, on an individual basis, in accordance
          with the American Arbitration Association&apos;s rules for arbitration of consumer-related disputes
          (accessible at{' '}
          <TextLink href="https://www.adr.org/sites/default/files/Consumer%20Rules.pdf">ConsumerRules.pdf</TextLink>)
          and you and the Protocol hereby expressly waive trial by jury and right to participate in a class action
          lawsuit or class-wide arbitration. The arbitration will be conducted by a single, neutral arbitrator and shall
          take place in the county or parish in which you reside, or another mutually agreeable location, in the English
          language. The arbitrator may award any relief that a court of competent jurisdiction could award, including
          attorneys&apos; fees when authorized by law, and the arbitral decision may be enforced in any court. At your
          request, hearings may be conducted in person or by telephone and the arbitrator may provide for submitting and
          determining motions on briefs, without oral hearings. The prevailing party in any action or proceeding to
          enforce this agreement shall be entitled to costs and attorneys&apos; fees. If the arbitrator(s) or
          arbitration administrator would impose filing fees or other administrative costs on you, we will reimburse
          you, upon request, to the extent such fees or costs would exceed those that you would otherwise have to pay if
          you were proceeding instead in a court. We will also pay additional fees or costs if required to do so by the
          arbitration administrator&apos;s rules or applicable law. Apart from the foregoing, each Party will be
          responsible for any other fees or costs, such as attorney fees that the Party may incur. If a court decides
          that any provision of this section 12.2 is invalid or unenforceable, that provision shall be severed and the
          other parts of this section 12.2 shall still apply. In any case, the remainder of this Agreement, will
          continue to apply.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          13. Severability Clause
        </Heading>

        <p>
          In case any provision in this Terms and Conditions shall be invalid, illegal or unenforceable, the validity,
          legality and enforceability of the remaining provisions shall not in any way be affected or impaired thereby
          and such provision shall be ineffective only to the extent of such invalidity, illegality or unenforceability.
        </p>

        <p>---</p>

        <p>UPDATED: {APP_TERMS?.UPDATED_AT}</p>
      </CardSection>
    </Card>
  </Page>
)

export default TermsOfUsePage
