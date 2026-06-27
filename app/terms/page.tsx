import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground">Last updated: December 7, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using AddisMark, you accept and agree to be bound by the terms and conditions of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
              <p className="text-muted-foreground">
                You must be at least 18 years old to use our services. By using AddisMark, you represent and warrant
                that you are at least 18 years of age and have the legal capacity to enter into this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-muted-foreground">
                To use certain features of our service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep
                it accurate, current, and complete.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Betting Rules</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All bets are final once confirmed.</li>
                <li>Minimum bet amount is 10 ETB.</li>
                <li>Maximum payout is 500,000 ETB per ticket.</li>
                <li>Bets placed after an event has started may be void.</li>
                <li>In case of event cancellation, bets will be settled as void (odds of 1.00).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Deposits and Withdrawals</h2>
              <p className="text-muted-foreground">
                Deposits are processed instantly. Withdrawals are processed within 24-48 hours. Minimum withdrawal
                amount is 50 ETB. We reserve the right to request identity verification before processing withdrawals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Responsible Gambling</h2>
              <p className="text-muted-foreground">
                AddisMark is committed to responsible gambling. We provide tools to help you control your gambling
                including deposit limits, self-exclusion, and time-out periods. If you feel you may have a gambling
                problem, please seek help immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Prohibited Activities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Using the service for any unlawful purpose.</li>
                <li>Creating multiple accounts.</li>
                <li>Using automated systems or bots.</li>
                <li>Colluding with other users.</li>
                <li>Money laundering or fraud.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                AddisMark shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at support@addismark.com or call our
                customer service at +251 11 123 4567.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
