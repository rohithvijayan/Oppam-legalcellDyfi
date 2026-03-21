import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "സേവനവ്യവസ്ഥകൾ | Terms of Service - Oppam",
    description: "Terms and conditions for using the Oppam legal advice portal.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                <h1 className="font-headline text-3xl font-black text-primary mb-8">സേവനവ്യവസ്ഥകൾ (Terms of Service)</h1>

                <div className="space-y-8 text-on-surface-variant leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">1. സന്നദ്ധ സേവനം (Voluntary Service)</h2>
                        <p>
                            'ഒപ്പം' എന്നത് ഒരു സൗജന്യ സന്നദ്ധ സേവനമാണ്. സൈബർ അധിക്ഷേപങ്ങൾ നേരിടുന്നവർക്ക് നിയമപരമായ ഉപദേശം നൽകുകയെന്ന ലക്ഷ്യത്തോടെയാണ് ഇത് പ്രവർത്തിക്കുന്നത്.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">2. ഉപദേശത്തിന്റെ സ്വഭാവം (Nature of Advice)</h2>
                        <p>
                            ഈ പോർട്ടൽ വഴി നൽകുന്ന വിവരങ്ങൾ പ്രാഥമിക നിയമോപദേശം മാത്രമാണ്. ഇത് ഒരു കോടതി വിധിയോ പൂർണ്ണമായ നിയമനടപടിയോ ആയി കണക്കാക്കരുത്. വിദഗ്ദ്ധ നിയമനടപടികൾക്കായി അംഗീകൃത അഭിഭാഷകരെ നേരിട്ട് സമീപിക്കേണ്ടതാണ്.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">3. വിവരങ്ങളുടെ കൃത്യത (Accuracy of Information)</h2>
                        <p>
                            നിങ്ങൾ നൽകുന്ന വിവരങ്ങൾ സത്യസന്ധവും കൃത്യവുമായിരിക്കണം. തെറ്റായ വിവരങ്ങൾ നൽകിയാൽ ഉണ്ടാകുന്ന ഭവിഷ്യത്തുകൾക്ക് ഉപഭോക്താവ് മാത്രമായിരിക്കും ഉത്തരവാദി.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-on-surface mb-3">4. സിസ്റ്റം ദുരുപയോഗം (System Misuse)</h2>
                        <p>
                            മറ്റൊരാളെ അപകീർത്തിപ്പെടുത്തുന്നതിനോ വ്യാജ പരാതികൾ നൽകുന്നതിനോ ഈ സംവിധാനം ഉപയോഗിക്കാൻ പാടുള്ളതല്ല. ദുരുപയോഗം ചെയ്യുന്നത് ശ്രദ്ധയിൽപ്പെട്ടാൽ വിവരങ്ങൾ നീക്കം ചെയ്യാനും നിയമനടപടി സ്വീകരിക്കാനും ഞങ്ങൾക്ക് അവകാശമുണ്ട്.
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
