import { Card } from "@/components";

export function Result() {
  return (
    <div>
      <Card>
        <div className="overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1807.4234832145016!2d121.5639777582312!3d25.039266995992516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5Y-w5YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1635209335640!5m2!1szh-TW!2stw"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
        <h2 className="text-xl">Station</h2>

        <ul>
          <li>Xizhi Station</li>
        </ul>
      </Card>
    </div>
  );
}
