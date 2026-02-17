from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from io import BytesIO
import json

def generate_pdf_report(report_data):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = styles['Title']
    story.append(Paragraph("AyurAI Diagnostic Report", title_style))
    story.append(Spacer(1, 12))

    # Patient Info (Mock)
    normal_style = styles['Normal']
    story.append(Paragraph(f"<b>Date:</b> {report_data['timestamp']}", normal_style))
    story.append(Paragraph(f"<b>Report ID:</b> {report_data['id']}", normal_style))
    story.append(Spacer(1, 12))

    # Diagnosis
    story.append(Paragraph("<b>Primary Diagnosis:</b>", styles['Heading2']))
    story.append(Paragraph(report_data['diagnosis'], normal_style))
    story.append(Spacer(1, 12))

    # Dosha Scores Table
    story.append(Paragraph("<b>Dosha Balance:</b>", styles['Heading3']))
    scores = report_data['scores']
    data = [
        ['Dosha', 'Score'],
        ['Vata', scores.get('Vata', 0)],
        ['Pitta', scores.get('Pitta', 0)],
        ['Kapha', scores.get('Kapha', 0)]
    ]
    t = Table(data)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    story.append(t)
    story.append(Spacer(1, 12))

    # Explanation
    story.append(Paragraph("<b>Clinical Reasoning:</b>", styles['Heading2']))
    story.append(Paragraph(report_data['explanation'], normal_style))
    story.append(Spacer(1, 12))

    # Recommendations
    story.append(Paragraph("<b>Recommendations:</b>", styles['Heading2']))
    recs = report_data['recommendations']
    if isinstance(recs, str):
        recs = json.loads(recs) # Handle if stored as string in DB
    
    for rec in recs:
        story.append(Paragraph(f"• {rec}", normal_style))

    doc.build(story)
    buffer.seek(0)
    return buffer
