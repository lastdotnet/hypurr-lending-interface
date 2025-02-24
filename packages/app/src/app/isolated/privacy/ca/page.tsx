import { Card, CardSection } from '@/astaria/components/Card'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page/Page'
import { APP_DATA, APP_TERMS } from '@/astaria/config/config'

////////////////////////////////////////////////////////////////
//  IMPORTANT: DO *NOT* UPDATE THE CONTENTS OF THIS FILE!!!   //
////////////////////////////////////////////////////////////////

const PrivacyPolicyCaliforniaPage = () => (
  <Page size="paper">
    <Heading className="mb-6 text-center" level={1}>
      Astaria Privacy Policy (California Residents)
    </Heading>

    <Card>
      <CardSection>
        <Heading className="mb-4" level={3}>
          1. Information We Collect
        </Heading>

        <p className="underline">Summary</p>

        <p>
          We use this information to operate, maintain, and provide our features and services on the website and
          communicate with you directly. You can control your receipt of email messages by clicking the
          &quot;unsubscribe&quot; button at the bottom of email communications you receive from us. We may also send you
          Service-related emails (e.g., account verification, change or updates to features of the Service, or technical
          and security notices). You may not opt-out of Service-related e-mails. For more information about your
          communication preferences, see &quot;Your Choices Regarding Your Information&quot; below.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          2. Information Automatically Collected
        </Heading>

        <p>
          We automatically collect certain types of usage information when you visit our website or use our Service.
          When you visit the Service, we may send one or more cookies — a small text file containing a string of
          alphanumeric characters — to your computer that uniquely identifies your browser and lets us help you log in
          faster and enhance your navigation through the site. A cookie may also convey information to us about how you
          use the Service (e.g., the pages you view, the links you click and other actions you take on the Service), and
          allow us to track your usage of the Service over time. We may collect log file information from your browser
          or mobile device each time you access the Service. Log file information may include anonymous information such
          as your web request, Internet Protocol (&quot;IP&quot;) address, browser type, identity of your internet
          service provider, information about your mobile device, referring / exit pages and URLs, the number and
          duration of page views, number of clicks and how you interact with links on the Service, domain names, landing
          pages, and other such information.
        </p>

        <p>
          When you access our site through a mobile device, we may receive or collect and store a unique identification
          number associated with your device and other device information. We may also employ clear gifs (also known as
          web beacons) which are used to anonymously track the online usage patterns of our Users. In addition, we may
          also use clear gifs in HTML-based emails sent to our users to track which emails are opened and which links
          are clicked by recipients. The information allows for more accurate reporting and improvement of the Service.
          We may also collect analytics data, or use third-party analytics tools, to help us measure traffic and usage
          trends for the Service. These tools collect information sent by your browser or mobile device, including the
          pages you visit, your use of third party applications, and other information that assists us in analyzing and
          improving the Service.
        </p>

        <p>
          We use or may use the data collected through cookies, log file, device identifiers, location data and clear
          gifs information to: (a) remember information so that you will not have to re-enter it during your visit or
          the next time you visit the site; (b) customize your user experience; (c) provide and monitor the
          effectiveness of our Service; (d) monitor aggregate metrics such as total number of visitors, traffic, usage,
          and demographic patterns on our website and our Service; (e) diagnose or fix technology problems; and (f)
          otherwise to plan for, improve and enhance our service. We may associate information we automatically collect
          with your other information.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          3. Sharing Personal Information With Third Parties
        </Heading>

        <p>
          We may share your personal information in the instances described below. For further information on your
          choices regarding your information, see the &quot;Your Choices Regarding Your Information&quot; section below:
        </p>

        <ul className="list-disc space-y-4 p-4 text-sm lg:px-20 md:px-10">
          <li>
            Other companies owned by or under common ownership as {APP_DATA.NAME}, which also includes our subsidiaries
            (i.e., any organization we own or control) or our ultimate holding company (i.e., any organization that owns
            or controls us) and any subsidiaries it owns. These companies will use your personal information in the same
            way as we can under this Policy
          </li>

          <li>
            Third party vendors, consultants and other service providers that perform services on our behalf, in order
            to carry out their work for us, which may include providing cloud storage or hosting services, marketing
            assistance, email delivery, content or service fulfillment, or providing analytics services. We share
            personal information with these third parties as needed to perform services for us and under reasonable
            confidentiality terms.
          </li>

          <li>
            Our business partners who offer a service to you jointly with us, for example, when running a co-sponsored
            contest or promotion.
          </li>

          <li>
            Third parties who we think may offer you products or services you may enjoy. We reserve the right to share
            your personal information, such as email address and user name, with third parties for their marketing
            purposes in the future if we determine that there may be additional products or services which may be of
            interest to you. See &quot;Your Choices&quot; below for details on how to opt-out of this sharing.
          </li>

          <li>
            Third parties at your request. For example, you may have the option to share your activities on our Services
            with your friends through social media.
          </li>

          <li>
            Other parties in connection with any company transaction, such as a merger, sale of company assets or
            shares, reorganization, financing, change of control or acquisition of all or a portion of our business by
            another company or third party or in the event of bankruptcy or related or similar proceedings.
          </li>

          <li>
            Third parties as required to (i) satisfy any applicable law, regulation, subpoena/court order, legal process
            or other government request, (ii) enforce our Terms of Use Agreement, including the investigation of
            potential violations thereof, (iii) investigate and defend ourselves against any third party claims or
            allegations, (iv) protect against harm to the rights, property or safety of {APP_DATA.NAME}, its users or
            the public as required or permitted by law and (v) detect, prevent or otherwise address criminal (including
            fraud or stalking), security or technical issues. We may also share information with others in an aggregated
            and anonymous form that does not reasonably identify you directly as an individual.
          </li>
        </ul>

        <Heading className="mt-6 mb-4" level={3}>
          4. Your Choices Regarding Your Information
        </Heading>

        <Heading className="mt-6 mb-3" level={4}>
          4.1 Marketing Communications
        </Heading>

        <p className="underline">Summary</p>

        <p>
          If you do not want to receive promotional emails from us, you can click the &quot;unsubscribe&quot; button on
          promotional email communications. Note that you will not be able to unsubscribe or opt-out of non-promotional
          messages regarding your account, such as account verification, password reminders, changes or updates to
          features of the Service, or technical and security notices.
        </p>

        <p>
          As of {APP_TERMS.UPDATED_AT}, {APP_DATA.NAME}{' '}
          <span className="underline">DOES NOT share any personal information</span> with third parties for advertising
          purposes, however we reserve the right to share your personal information with third parties for their
          marketing purposes in the future if we determine that there may be additional products or services which may
          be of interest to you. If you wish to have your information excluded from any such future sharing with
          partners, please email {APP_TERMS.PRIVACY_EMAIL} with the subject &quot;Direct Marketing Opt-Out.&quot; We
          will not send you an individualized notification that this policy is being updated if we elect to share
          information with a partner in this manner, so you must opt-out now. If you have any questions about this
          opt-out or our marketing practices, please email us at {APP_TERMS.PRIVACY_EMAIL}.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.2 Online Advertising
        </Heading>

        <p className="underline">Summary</p>

        <p>
          In the future, we may share certain tracking information with online advertising networks so that they may
          display ads that may be relevant to your interests on our Service as well as on other websites or apps.
          Typically, the information we would share in this regard is provided through cookies or similar tracking
          technologies. The only way to completely &quot;opt out&quot; of the collection of any information through
          cookies or other tracking technology is to actively manage the settings on your browser or mobile device.
          Please refer to your browser&apos;s or mobile device&apos;s technical information for instructions on how to
          delete and disable cookies, and other tracking/recording tools. (To learn more about behavioral advertising
          and to learn how to opt-out, you may wish to visit https://aboutads.info). Depending on your mobile device,
          you may not be able to control tracking technologies through settings.
        </p>

        <p className="bold">Do Not Track</p>

        <p>
          At this time, we do not collect information from you for behavioral advertising purposes, though we may
          collect persistent identifiers from your browser or mobile device to assist us with providing and improving
          the Service. Because we collect browsing and persistent identifier data only for analytic and internal
          purposes, your selection of the &apos;Do Not Track&apos; option provided by your mobile browser will not have
          any effect on our collection of analytics information or the collection of a persistent identifier.
        </p>

        <p className="bold">Data Access and Retention</p>

        <p>
          If you wish to change or delete your profile and personal information, you may contact us at{' '}
          {APP_TERMS.PRIVACY_EMAIL} and we will amend or delete your personal information within a reasonable time after
          your request. Because of the crowd-sourced and collaborative nature of our service, however, we will not be
          able to delete content you post to public areas of our site. We may be able to anonymize your information such
          that you will no longer be reasonably identifiable.
        </p>

        <p className="bold">Security and Storage of Information</p>

        <p>
          {APP_DATA.NAME} cares about the security of your information and uses commercially reasonable physical,
          administrative, and technological safeguards to preserve the integrity and security of all information we
          collect and that we share with our service providers. Because of the nature of our website, WE DO NOT
          CURRENTLY ENCRYPT ANY TRANSMISSIONS TO OR FROM THE WEBSITE IN ANY MANNER. IF YOU ARE UNCOMFORTABLE WITH THE
          UNENCRYPTED TRANSMISSION OF THE PERSONAL INFORMATION DESCRIBED HEREIN, PLEASE DO NOT SUBMIT INFORMATION TO US
          THROUGH THE WEBSITE. While we take reasonable precautions against possible security breaches, no website or
          internet transmission is completely secure and we cannot guarantee that unauthorized access, hacking, data
          loss or other breach will never occur. In the event that any information under our control is compromised as a
          result of a breach of security, we will take reasonable steps to investigate the situation and where
          appropriate, notify those individuals whose information may have been compromised and take other steps, in
          accordance with any applicable laws and regulations.
        </p>

        <p className="bold">Children&apos;s Privacy</p>

        <p>
          This Website is not intended for children under the age of 13 and we do not knowingly collect any personal
          information from children under 13. In the event that we learn that we have inadvertently collected personal
          information from children under 13, we will delete or anonymize such information. Please contact us at{' '}
          {APP_TERMS.PRIVACY_EMAIL} if you have any questions about children&apos;s privacy.
        </p>

        <p className="bold">Cookies</p>

        <p>
          A browser cookie is a small piece of data that is stored on your device to help websites and mobile apps
          remember things about you. Other technologies, including Web storage and identifiers associated with your
          device, may be used for similar purposes. In this policy, we say &quot;cookies&quot; to refer to all of these
          technologies.
        </p>

        <p className="bold">How We Use Cookies</p>

        <p>
          Like most providers of online services, our site uses cookies, including third-party cookies, for a number of
          reasons, like protecting your data and account, helping us see which features are most popular, counting
          visitors to a page, improving our users&apos; experience, keeping our services secure, providing relevant
          advertising, and just generally providing you with a better, more intuitive, and satisfying experience. The
          cookies we use generally fall into one of the following categories:
        </p>

        <p className="bold">Necessary</p>

        <p>
          For example, we may use these cookies to store your session information to prevent others from changing your
          password without your username and password.
        </p>

        <p className="bold">Preferences</p>

        <p>
          We use these cookies to remember your settings and preferences, and to improve your experience on our site.
          For example, we may use these cookies to remember your language preferences.
        </p>

        <p className="bold">Performance</p>

        <p>
          We use these cookies to collect information about how you use our site, monitor site performance, and improve
          our site performance, our services, and your experience.For example, we can use these cookies to learn more
          about which features are the most popular with our users and which ones might need some tweaks.
        </p>

        <p className="bold">Marketing</p>

        <p>
          We use these cookies to deliver advertisements, to make them more relevant and meaningful to consumers, and to
          track the efficiency of our advertising campaigns, both on our services and on other sites or mobile apps.may
          use these cookies to build a profile of your interests and deliver relevant advertising on other sites.
        </p>

        <Heading className="mt-6 mb-3" level={4}>
          4.3 Analytics and Advertising Services
        </Heading>

        <p className="bold">Provided by Others</p>

        <p>
          We may let other companies use cookies on our services. These companies may collect information about how you
          use our services over time and combine it with similar information from other services and companies. This
          information may be used to, among other things, analyze and track data, determine the popularity of certain
          content, and better understand your online activity.
        </p>

        <p>
          Additionally, some companies, including our affiliates, may use information collected on our services to
          prevent fraud or other unauthorized or illegal activity and to measure and optimize the performance of ads and
          deliver more relevant ads on behalf of us or other companies, including on third-party websites and apps.
        </p>

        <p className="bold">Provided by Us</p>

        <p>
          We may collect information about your activity on third-party services that use cookies provided by us. We use
          this information to improve our advertising services, including measuring the performance of ads and showing
          you more relevant ads.
        </p>

        <p className="bold">Links to third party websites</p>

        <p>
          The Services may, from time to time, contain links to and from third party websites of our partner networks,
          advertisers, partner merchants, retailers and affiliates. If you follow a link to any of these websites,
          please note that these websites have their own privacy policies and that we do not accept any responsibility
          or liability for their policies. Please check the individual policies before you submit any information to
          those websites.
        </p>

        <Heading className="mt-6 mb-4" level={3}>
          5. California Residents (California Consumer Privacy Act of 2018)
        </Heading>

        <p>
          The California Constitution grants a right of privacy. Existing law provides for the confidentiality of
          personal information in various contexts and requires a business or person that suffers a breach of security
          of computerized data that includes personal information, as defined, to disclose that breach, as specified.
        </p>

        <p>
          California Consumer Privacy Act of 2018. Beginning January 1, 2020, the act will grant a consumer a right to
          request a business to disclose the categories and specific pieces of personal information that it collects
          about the consumer, the categories of sources from which that information is collected, the business purposes
          for collecting or selling the information, and the categories of 3rd parties with which the information is
          shared. The act will require a business to make disclosures about the information and the purposes for which
          it is used. The act will grant a consumer the right to request deletion of personal information and would
          require the business to delete upon receipt of a verified request, as specified.
        </p>

        <p>
          The act will grant a consumer a right to request that a business that sells the consumer&apos;s personal
          information, or discloses it for a business purpose, disclose the categories of information that it collects
          and categories of information and the identity of 3rd parties to which the information was sold or disclosed.
          The act will require a business to provide this information in response to a verifiable consumer request. The
          act will authorize a consumer to opt out of the sale of personal information by a business and would prohibit
          the business from discriminating against the consumer for exercising this right, including by charging the
          consumer who opts out a different price or providing the consumer a different quality of goods or services,
          except if the difference is reasonably related to value provided by the consumer&apos;s data. The act will
          authorize businesses to offer financial incentives for collection of personal information. The act will
          prohibit a business from selling the personal information of a consumer under 16 years of age, unless
          affirmatively authorized, as specified, to be referred to as the right to opt in. The act will prescribe
          requirements for receiving, processing, and satisfying these requests from consumers. The act will prescribe
          various definitions for its purposes and would define “personal information” with reference to a broad list of
          characteristics and behaviors, personal and commercial, as well as inferences drawn from this information. The
          act will prohibit the provisions described above from restricting the ability of the business to comply with
          federal, state, or local laws, among other things.
        </p>

        <p className="break-words">
          Bill text: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375
        </p>

        <p>More info: https://www.caprivacy.org</p>

        <Heading className="mt-6 mb-4" level={3}>
          6. Updates to this Policy
        </Heading>

        <p>
          We reserve the right to modify this Policy from time to time. If we make any changes to this Policy, we will
          change the &quot;Last Revision&quot; date below and will post the updated Policy on this page.
        </p>

        <p>---</p>

        <p>UPDATED: {APP_TERMS.UPDATED_AT}</p>
      </CardSection>
    </Card>
  </Page>
)

export default PrivacyPolicyCaliforniaPage
