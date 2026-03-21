import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "സ്വകാര്യതാ നയം | Privacy Policy - Oppam",
    description: "Learn how Oppam handles and protects your personal information and evidence.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                <h1 className="font-headline text-3xl font-black text-primary mb-8">സ്വകാര്യതാ നയം (Privacy Policy)</h1>

                <div className="space-y-8 text-on-surface-variant leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">1. വിവരശേഖരണം (Information Collection)</h2>
                        <p>
                            സൈബർ അധിക്ഷേപങ്ങൾക്കെതിരെയുള്ള നിയമോപദേശത്തിനായി നിങ്ങൾ നൽകുന്ന പേര്, മേൽവിലാസം, ഫോൺ നമ്പർ, ഇമെയിൽ, സോഷ്യൽ മീഡിയ ലിങ്കുകൾ, തെളിവുകൾ (സ്ക്രീൻഷോട്ടുകൾ, വീഡിയോകൾ) എന്നിവ ഞങ്ങൾ ശേഖരിക്കുന്നു.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">2. ഡാറ്റാ സുരക്ഷ (Data Security)</h2>
                        <p>
                            നിങ്ങൾ നൽകുന്ന എല്ലാ വിവരങ്ങളും 'Encryption' സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു. അനധികൃതമായ ആർക്കും ഈ വിവരങ്ങൾ ലഭ്യമാകില്ലെന്ന് ഞങ്ങൾ ഉറപ്പുവരുത്തുന്നു.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">3. വിവരങ്ങൾ ഉപയോഗിക്കുന്ന രീതി (Use of Information)</h2>
                        <p>
                            നിങ്ങൾക്ക് ആവശ്യമായ നിയമസഹായം നൽകുന്നതിനും, ഞങ്ങളുടെ നിയമവിദഗ്ധർക്ക് നിങ്ങളുടെ പരാതി പഠിക്കുന്നതിനും മാത്രമായിരിക്കും ഈ വിവരങ്ങൾ ഉപയോഗിക്കുക. നിങ്ങളുടെ അനുവാദമില്ലാതെ ഈ വിവരങ്ങൾ മൂന്നാമതൊരാൾക്കോ സ്ഥാപനത്തിനോ കൈമാറുന്നതല്ല.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">4. നിങ്ങളുടെ അവകാശങ്ങൾ (Your Rights)</h2>
                        <p>
                            നിങ്ങൾ നൽകിയ വിവരങ്ങൾ തിരുത്തുന്നതിനോ സിസ്റ്റത്തിൽ നിന്ന് നീക്കം ചെയ്യുന്നതിനോ നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും ആവശ്യപ്പെടാവുന്നതാണ്.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-outline-variant/30 text-sm opacity-70">
                        Last Updated: March 21, 2026
                    </div>
                </div>
            </div>
        </div>
    );
}
